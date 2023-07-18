import express, { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { nanoid } from 'nanoid';
import auth from '../../middleware/auth';
import { JWT } from 'google-auth-library';
import { drive_v3, google } from 'googleapis';

const prisma = new PrismaClient();
const router = express.Router();

const serviceClient = new google.auth.GoogleAuth({
  keyFile: 'membership-checker-e5457b93d746.json',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ],
});

interface PageCustomization {
  name: string;
  organisationId: number;
  sheetId: string;
  sheetTabId: string;
  backgroundColor?: string;
  textFieldBackgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  headingColor?: string;
  logoLink?: string;
  backgroundImageLink?: string;
  fontFamily?: string;
  columns: {
    originalName: string;
    mappedToName?: string;
  }[];
}

router.post('/create', auth, async (req: Request, res: Response) => {
  try {
    const customization: PageCustomization = req.body;

    const { name, organisationId, sheetId, sheetTabId, columns, ...rest } =
      customization;

    if (!name || !organisationId || !sheetId || !sheetTabId)
      return res
        .status(400)
        .send(
          '`name`, `organisationId`, `sheetId`, and `sheetTabId` are required fields'
        );

    const pathId = nanoid(); // Generate random path ID

    const existingSheetID = await prisma.page.findUnique({
      where: { sheetId: sheetId },
    });

    if (existingSheetID) {
      return res.status(400).json({ error: 'Sheet ID already exists' });
    }

    const user = req.body.user;
    // intialise credentials
    const userEmailAddress = user.email;

    // try {
    //   const drive = google.drive({
    //     version: 'v3',
    //     auth: serviceClient,
    //   });
    //   console.log(await drive.files.list());
    //   const permissions = await drive.permissions.list({
    //     fileId: sheetId,
    //     fields: 'permissions(emailAddress)',
    //   });
    //   const isSharedWithEmail = permissions.data.permissions!.some(
    //     (permission: drive_v3.Schema$Permission) =>
    //       permission.emailAddress === userEmailAddress
    //   );
    //   if (!isSharedWithEmail)
    //     return res.status(401).send('unauthorised to access this spreadsheet');
    // } catch (err) {
    //   console.error(err);
    //   return res
    //     .status(500)
    //     .send(
    //       'failed to check if sheet is shared with user. make sure this spreadsheet is shared with the service account.'
    //     );
    // }

    const page = await prisma.page.create({
      data: {
        name: name, // or simply name, as they have the same name
        organisationId: organisationId,
        sheetId: sheetId,
        sheetTabId: sheetTabId,
        webLink: pathId,
        backgroundColor: rest.backgroundColor,
        textFieldBackgroundColor: rest.textFieldBackgroundColor,
        textColor: rest.textColor,
        buttonColor: rest.buttonColor,
        headingColor: rest.headingColor,
        logoLink: rest.logoLink,
        backgroundImageLink: rest.backgroundImageLink,
        fontFamily: rest.fontFamily!,
      },
    });

    columns.forEach(async ({ originalName, mappedToName }) => {
      await prisma.column.create({
        data: {
          pageId: page.id,
          sheetsName: originalName,
          mappedTo: mappedToName || originalName,
        },
      });
    });

    res.status(200).json({ pathId });
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(400).json({ error: 'Error creating page' });
  }
});

export default router;
