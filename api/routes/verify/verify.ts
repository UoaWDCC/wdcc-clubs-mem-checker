import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { google } from 'googleapis';
import serviceClient from '../../service';

const prisma = new PrismaClient();
export const router = express.Router();

router.get(
  '/:webLink/:columnName/:value',
  async (req: Request, res: Response) => {
    const { webLink, columnName, value } = req.params;
    if (!webLink || !columnName || !value)
      return res
        .status(400)
        .send('`pageId`, `columnName`, and `value` are required fields');

    const page = await prisma.page.findFirst({
      where: {
        webLink,
      },
    });

    if (!page)
      return res.status(400).send(`could not find page with link ${webLink}`);

    // intialise credentials
    const sheets = google.sheets({ version: 'v4', auth: serviceClient });
    const columnData: {
      [key: string]: { id: string; name: string; unique: boolean };
    } = {};

    try {
      // Retrieve the metadata for the spreadsheet to get the names and IDs of all sheet
      const spreadsheetId = page.sheetId;
      const spreadsheetTabId = page.sheetTabId;
      const metadataResponse = await sheets.spreadsheets.get({
        spreadsheetId,
      });

      // If there are no sheets in the spreadsheet, return an empty object
      if (!metadataResponse.data.sheets) {
        return res
          .status(400)
          .send(JSON.stringify('spreadsheet has no sheets'));
      }

      // Find the sheet ID that matches the given gid
      const sheet = metadataResponse.data.sheets.find(
        (sheet) => sheet.properties?.sheetId === Number(spreadsheetTabId)
      );

      // If the sheet ID is not found, return an error
      if (!sheet) {
        return res.status(404).send(JSON.stringify('sheet not found'));
      }

      // Get the name of the sheet
      const sheetName = sheet.properties?.title;

      // Create an object to store the column data for each sheet
      const columnData: {
        [key: string]: { id: string; name: string; unique: boolean };
      } = {};

      // Retrieve the data from the sheet
      const range = `${sheetName}!A1:Z`;
      const {
        data: { values },
      } = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      if (!values) return res.status(500).send('club has no members');

      const originalColumn = await prisma.column.findFirst({
        where: {
          pageId: page.id,
          displayName: columnName,
        },
      });

      if (!originalColumn)
        return res
          .status(400)
          .send(
            `could not find column mapped to ${columnName} in page with id ${page.id}`
          );

      // Extract column headers. We assume the first row contains the column headers.
      const headers = values[0];
      const originalColumnName = originalColumn.originalName;

      if (!headers.includes(originalColumnName))
        return res
          .status(500)
          .send(
            `could not find that column ${originalColumnName} mapped to ${columnName} in spreadsheet`
          );

      const columnIndex: number = headers.indexOf(originalColumnName);

      // Iterate through each column
      const column = values.slice(1).map((row) => row[columnIndex]);
      if (
        column
          .map((element: string) => {
            try {
              return element.toLowerCase();
            } catch (err) {
              return '';
            }
          })
          .includes(value.toLowerCase())
      ) {
        await prisma.membershipCheckUsage.create({
          data: {
            pageId: page.id,
            isDuplicate: true,
            userInput: value,
            columnName,
          },
        });

        return res.status(200).send('value found in column');
      } else {
        await prisma.membershipCheckUsage.create({
          data: {
            pageId: page.id,
            isDuplicate: false,
            userInput: value,
            columnName,
          },
        });

        return res.status(200).send('could not find user in column');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('error retrieving data');
    }
  }
);

export default router;
