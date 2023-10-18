import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../../middleware/auth';
import { google } from 'googleapis';
import { IMemberCountByPageId } from '../../../client/src/types/IMemberCountByPageId';
import serviceClient from '../../service';

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

const sheets = google.sheets({
  version: 'v4',
  auth: serviceClient,
});

router.get('/:organisationId', auth, async (req: Request, res: Response) => {
  try {
    const organisationId = Number.parseInt(req.params['organisationId']);

    const pages = await prisma.page.findMany({
      where: {
        organisationId: organisationId,
      },
      select: {
        id: true,
        sheetId: true,
        sheetTabId: true,
        identificationColumns: {
          select: {
            sheetsName: true,
          },
        },
      },
    });

    if (!pages) {
      return res
        .status(500)
        .send(`No Pages found for organisation ${organisationId}`);
    }

    const memberCountByPageId: IMemberCountByPageId = {};

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      const metadataResponse = await sheets.spreadsheets.get({
        spreadsheetId: page.sheetId,
      });

      if (!metadataResponse.data.sheets) {
        return res
          .status(400)
          .send(JSON.stringify('spreadsheet has no sheets'));
      }

      const sheet = metadataResponse.data.sheets.find(
        (sheet) => sheet.properties?.sheetId === Number(page.sheetTabId)
      );

      if (!sheet) {
        return res.status(400).send(JSON.stringify('sheet not found'));
      }

      const sheetName = sheet.properties?.title;

      const range = `${sheetName}!A1:Z`;
      const {
        data: { values },
      } = await sheets.spreadsheets.values.get({
        spreadsheetId: page.sheetId,
        range: range,
      });

      const columnNames = [];

      for (let j = 0; j < page.identificationColumns.length; j++) {
        columnNames.push(page.identificationColumns[j].sheetsName);
      }

      if (values) {
        const headers = values[0];

        for (let k = 0; k < headers.length; k++) {
          if (columnNames.includes(headers[k])) {
            const columnData = values.slice(1).map((row) => row[k]);

            const nonEmptyRowCount = columnData.filter(
              (cellValue) => cellValue !== '' && cellValue !== undefined
            ).length;

            memberCountByPageId[page.id] = {
              UniqueColumnName: headers[k],
              totalMembers: nonEmptyRowCount,
            };
          }
        }
      }
    }

    return res.status(200).send(memberCountByPageId);
  } catch (err) {
    console.error(err);
    return res.status(500).send('failed to retrieve list of admins');
  }
});

export default router;
