import express, { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { nanoid } from 'nanoid';
import auth from '../../middleware/auth';
import { JWT } from 'google-auth-library';
import { drive_v3, google } from 'googleapis';
import multer, { memoryStorage } from 'multer';
import { supabase } from '../..';
import { v4 as uuidv4 } from 'uuid';
import IPageCustomization from '../types/IPageCustomization';
import serviceClient from '../../service';

const prisma = new PrismaClient();
export const router = express.Router();

const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/create',
  upload.fields([
    {
      name: 'background',
    },
    {
      name: 'logo',
    },
  ]),
  auth,
  async (req: Request, res: Response) => {
    try {
      const customization: IPageCustomization = req.body;

      const {
        name,
        organisationId,
        sheetId,
        sheetTabId,
        identificationColumns,
        fontFamily,
        ...rest
      } = customization;

      if (
        !name ||
        !organisationId ||
        !sheetId ||
        !sheetTabId ||
        !identificationColumns
      )
        return res
          .status(400)
          .send(
            '`name`, `organisationId`, `sheetId`, `sheetTabId`, and `identificationColumns` are required fields'
          );

      // Check if the sheet id is already in use
      // *we are not using this now that it does not need to be unique
      // const existingSheetID = await prisma.page.findUnique({
      //   where: { sheetId: sheetId },
      // });

      // if (existingSheetID) {
      //   return res.status(400).json({ error: 'Sheet ID already exists' });
      // }

      const numberOrganisationId: number = Number.parseInt(organisationId);

      // Is user even in organisation
      const isUserInOrg =
        (await prisma.usersInOrganisation.count({
          where: {
            organisationId: numberOrganisationId,
            userId: req.body.user.id,
          },
        })) == 1;

      if (!isUserInOrg)
        return res
          .status(400)
          .send('user must be in organisation to create page');

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const { background, logo } = files;

      let backgroundUrl: string | undefined = undefined;
      let logoUrl: string | undefined = undefined;
      const storageBucketUrlPrefix = process.env.SUPABASE_STORAGE_URL_PREFIX!;

      if (background && background[0]) {
        const fileName = background[0].originalname;
        const buffer = background[0].buffer;
        const { data, error } = await supabase.storage
          .from('image-bucket')
          .upload(`${uuidv4()}.${fileName.split('.').pop()}`, buffer, {
            contentType: 'image/*',
          });
        if (error) {
          console.error(`Error: ${JSON.stringify(error)}`);
          return res
            .status(500)
            .send('failed to upload background to storage bucket');
        }
        backgroundUrl = storageBucketUrlPrefix + data.path;
      }

      if (logo && logo[0]) {
        const fileName = logo[0].originalname;
        const buffer = logo[0].buffer;
        const { data, error } = await supabase.storage
          .from('image-bucket')
          .upload(`${uuidv4()}.${fileName.split('.').pop()}`, buffer, {
            contentType: 'image/*',
          });
        if (error) {
          console.error(`Error: ${JSON.stringify(error)}`);
          return res
            .status(500)
            .send('failed to upload logo to storage bucket');
        }
        logoUrl = storageBucketUrlPrefix + data.path;
      }

      const pathId = nanoid(); // Generate random path ID

      const page = await prisma.page.create({
        data: {
          name: name,
          organisationId: numberOrganisationId,
          sheetId: sheetId,
          sheetTabId: sheetTabId,
          webLink: pathId,
          backgroundColor: rest.backgroundColor,
          textFieldBackgroundColor: rest.textFieldBackgroundColor,
          textColor: rest.textColor,
          buttonColor: rest.buttonColor,
          headingColor: rest.headingColor,
          dropDownBackgroundColor: rest.dropDownBackgroundColor,
          logoLink: logoUrl,
          backgroundImageLink: backgroundUrl,
          fontFamily: fontFamily || 'Montserrat',
        },
      });

      // @ts-ignore
      const parsedColumns = JSON.parse(identificationColumns);
      // @ts-ignore
      parsedColumns!.forEach(async ({ originalName, displayName }) => {
        await prisma.column.create({
          data: {
            pageId: page.id,
            originalName: originalName,
            displayName: displayName || originalName,
          },
        });
      });

      res.status(200).json({ pathId });
    } catch (error) {
      console.error(`Error creating page: ${error}`);
      res.status(400).json({ error: 'Error creating page' });
    }
  }
);

router.post(
  '/edit',
  upload.fields([
    {
      name: 'background',
    },
    {
      name: 'logo',
    },
  ]),
  auth,
  async (req: Request, res: Response) => {
    try {
      const customization: IPageCustomization & { webLink: string } = req.body;

      const {
        name,
        sheetId,
        sheetTabId,
        identificationColumns,
        fontFamily,
        webLink,
        ...rest
      } = customization;

      if (!webLink)
        return res.status(400).send('`webLink` is a required field');

      const existingPage = await prisma.page.findUnique({
        where: {
          webLink,
        },
      });

      if (!existingPage)
        return res.status(404).send('cannot find page with that weblink');

      const organisationId = existingPage.organisationId;
      const userId = req.body.user.id;

      // Is user even in organisation
      const isUserInOrg =
        (await prisma.usersInOrganisation.count({
          where: {
            organisationId,
            userId,
          },
        })) == 1;

      if (!isUserInOrg)
        return res
          .status(400)
          .send('user must be in organisation to create page');

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      let backgroundUrl: string | undefined = undefined;
      let logoUrl: string | undefined = undefined;
      const storageBucketUrlPrefix = process.env.SUPABASE_STORAGE_URL_PREFIX!;

      if (files && files.background && files.background[0]) {
        const { background } = files;
        const fileName = background[0].originalname;
        const buffer = background[0].buffer;
        const { data, error } = await supabase.storage
          .from('image-bucket')
          .upload(`${uuidv4()}.${fileName.split('.').pop()}`, buffer, {
            contentType: 'image/*',
          });
        if (error) {
          console.error(`Error: ${JSON.stringify(error)}`);
          return res
            .status(500)
            .send('failed to upload background to storage bucket');
        }
        backgroundUrl = storageBucketUrlPrefix + data.path;
      }

      if (files && files.logo && files.logo[0]) {
        const { logo } = files;
        const fileName = logo[0].originalname;
        const buffer = logo[0].buffer;
        const { data, error } = await supabase.storage
          .from('image-bucket')
          .upload(`${uuidv4()}.${fileName.split('.').pop()}`, buffer, {
            contentType: 'image/*',
          });
        if (error) {
          console.error(`Error: ${JSON.stringify(error)}`);
          return res
            .status(500)
            .send('failed to upload logo to storage bucket');
        }
        logoUrl = storageBucketUrlPrefix + data.path;
      }

      console.log('uploaded files');

      const page = await prisma.page.update({
        where: {
          webLink,
        },
        data: {
          name: name ?? existingPage.name,
          sheetId: sheetId ?? existingPage.sheetId,
          sheetTabId: sheetTabId ?? existingPage.sheetTabId,
          backgroundColor: rest.backgroundColor ?? existingPage.backgroundColor,
          textFieldBackgroundColor:
            rest.textFieldBackgroundColor ??
            existingPage.textFieldBackgroundColor,
          textColor: rest.textColor ?? existingPage.textColor,
          buttonColor: rest.buttonColor ?? existingPage.buttonColor,
          headingColor: rest.headingColor ?? existingPage.headingColor,
          dropDownBackgroundColor:
            rest.dropDownBackgroundColor ??
            existingPage.dropDownBackgroundColor,
          logoLink: logoUrl ?? existingPage.logoLink,
          backgroundImageLink: backgroundUrl ?? existingPage.backgroundColor,
          fontFamily: fontFamily ?? existingPage.fontFamily ?? 'Montserrat',
        },
      });

      console.log('updated page');

      const parsedColumns: {
        originalName: string;
        displayName?: string;
      }[] = JSON.parse(identificationColumns || '[]');
      parsedColumns!.forEach(async ({ originalName, displayName }) => {
        await prisma.column.create({
          data: {
            pageId: page.id,
            originalName: originalName,
            displayName: displayName ?? originalName,
          },
        });
      });

      res.status(200).json({ webLink });
    } catch (error) {
      console.error(`Error editing page: ${error}`);
      res.status(400).json({ error: 'Error editing page' });
    }
  }
);

router.get('/info/:webLink', async (req: Request, res: Response) => {
  const { webLink } = req.params;

  const pageData = await prisma.page.findFirst({
    where: {
      webLink,
    },
  });

  if (!pageData)
    return res.status(400).send('failed to get data with that link');

  const columnData = await prisma.column.findMany({
    where: {
      pageId: pageData.id,
    },
  });

  if (!columnData)
    return res.status(400).send('failed to get columns data with that link');

  const dataToReturn: any = {
    title: pageData?.name,
    backgroundColor: pageData?.backgroundColor,
    dropDownBackgroundColor: pageData.dropDownBackgroundColor,
    textFieldBackgroundColor: pageData?.textFieldBackgroundColor,
    textFieldtextColor: pageData?.textColor,
    buttonColor: pageData?.buttonColor,
    titleTextColor: pageData?.headingColor,
    logoLink: pageData?.logoLink || undefined,
    backgroundImageLink: pageData?.backgroundImageLink || undefined,
    font: pageData?.fontFamily,
    clubId: pageData?.organisationId,
    identificationColumns: columnData,
  };

  return res.status(200).send(dataToReturn);
});

export default router;
