import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { nanoid } from "nanoid";
import auth from "../../middleware/auth";
import { JWT } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import multer, { memoryStorage } from "multer";
import { supabase } from "../..";
import { v4 as uuidv4 } from "uuid";
import IPageCustomization from "../types/IPageCustomization";

const prisma = new PrismaClient();
export const router = express.Router();

const storage = memoryStorage();
const upload = multer({ storage });

const serviceClient = new google.auth.GoogleAuth({
  keyFile: "membership-checker-e5457b93d746.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
  ],
});

router.post(
  "/create",
  upload.fields([
    {
      name: "background",
    },
    {
      name: "logo",
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
        columns,
        fontFamily,
        ...rest
      } = customization;

      if (!name || !organisationId || !sheetId || !sheetTabId || !columns)
        return res
          .status(400)
          .send(
            "`name`, `organisationId`, `sheetId`, `sheetTabId`, and `columns` are required fields"
          );

      const existingSheetID = await prisma.page.findUnique({
        where: { sheetId: sheetId },
      });

      if (existingSheetID) {
        return res.status(400).json({ error: "Sheet ID already exists" });
      }

      const user = req.body.user;
      // intialise credentials
      const userEmailAddress = user.email;

      try {
        const drive = google.drive({
          version: "v3",
          auth: serviceClient,
        });
        console.log(await drive.files.list());
        const permissions = await drive.permissions.list({
          fileId: sheetId,
          fields: "permissions(emailAddress)",
        });
        const isSharedWithEmail = permissions.data.permissions!.some(
          (permission: drive_v3.Schema$Permission) =>
            permission.emailAddress === userEmailAddress
        );
        if (!isSharedWithEmail)
          return res
            .status(401)
            .send("unauthorised to access this spreadsheet");
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .send(
            "failed to check if sheet is shared with user. make sure this spreadsheet is shared with the service account."
          );
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const { background, logo } = files;

      let backgroundUrl: string | undefined = undefined;
      let logoUrl: string | undefined = undefined;
      const storageBucketUrlPrefix = process.env.SUPABASE_STORAGE_URL_PREFIX!;

      if (background && background[0]) {
        const fileName = background[0].originalname;
        const buffer = background[0].buffer;
        const { data, error } = await supabase.storage
          .from("image-bucket")
          .upload(`${uuidv4()}.${fileName.split(".").pop()}`, buffer, {
            contentType: "image/*",
          });
        if (error) {
          console.error(`Error: ${JSON.stringify(error)}`);
          return res
            .status(500)
            .send("failed to upload background to storage bucket");
        }
        backgroundUrl = storageBucketUrlPrefix + data.path;
      }

      if (logo && logo[0]) {
        const fileName = logo[0].originalname;
        const buffer = logo[0].buffer;
        const { data, error } = await supabase.storage
          .from("image-bucket")
          .upload(`${uuidv4()}.${fileName.split(".").pop()}`, buffer, {
            contentType: "image/*",
          });
        if (error) {
          console.error(`Error: ${JSON.stringify(error)}`);
          return res
            .status(500)
            .send("failed to upload logo to storage bucket");
        }
        logoUrl = storageBucketUrlPrefix + data.path;
      }
      console.log(`logoUrl = ${logoUrl}, backgroundUrl = ${backgroundUrl}`);

      const pathId = nanoid(); // Generate random path ID
      const numberOrganisationId: number = Number.parseInt(organisationId);

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
          logoLink: logoUrl,
          backgroundImageLink: backgroundUrl,
          fontFamily: fontFamily || "Montserrat",
        },
      });

      // @ts-ignore
      const parsedColumns = JSON.parse(columns);
      // @ts-ignore
      parsedColumns!.forEach(async ({ originalName, mappedTo }) => {
        await prisma.column.create({
          data: {
            pageId: page.id,
            sheetsName: originalName,
            mappedTo: mappedTo || originalName,
          },
        });
      });

      res.status(200).json({ pathId });
    } catch (error) {
      console.error(`Error creating page: ${error}`);
      res.status(400).json({ error: "Error creating page" });
    }
  }
);

router.get(
  "/verify/:webLink/:columnName/:value",
  async (req: Request, res: Response) => {
    const { webLink, columnName, value } = req.params;
    if (!webLink || !columnName || !value)
      return res
        .status(400)
        .send("`pageId`, `columnName`, and `value` are required fields");

    const page = await prisma.page.findFirst({
      where: {
        webLink,
      },
    });

    if (!page)
      return res.status(400).send(`could not find page with link ${webLink}`);

    // intialise credentials
    const sheets = google.sheets({ version: "v4", auth: serviceClient });
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
          .send(JSON.stringify("spreadsheet has no sheets"));
      }

      // Find the sheet ID that matches the given gid
      const sheet = metadataResponse.data.sheets.find(
        (sheet) => sheet.properties?.sheetId === Number(spreadsheetTabId)
      );

      // If the sheet ID is not found, return an error
      if (!sheet) {
        return res.status(404).send(JSON.stringify("sheet not found"));
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

      if (!values) return res.status(500).send("club has no members");

      const originalColumn = await prisma.column.findFirst({
        where: {
          pageId: page.id,
          mappedTo: columnName,
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
      const originalColumnName = originalColumn.sheetsName;

      if (!headers.includes(originalColumnName))
        return res
          .status(500)
          .send(
            `could not find that column ${originalColumnName} mapped to ${columnName} in spreadsheet`
          );

      const columnIndex: number = headers.indexOf(originalColumnName);

      // Iterate through each column
      const column = values.slice(1).map((row) => row[columnIndex]);
      if (column.includes(value)) {
        await prisma.membershipCheckUsage.create({
          data: {
            pageId: page.id,
            isDuplicate: true,
            userInput: value,
            columnName,
          },
        });

        return res.status(200).send("value found in column");
      } else {
        await prisma.membershipCheckUsage.create({
          data: {
            pageId: page.id,
            isDuplicate: false,
            userInput: value,
            columnName,
          },
        });

        return res.status(404).send("could not find user in column");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("error retrieving data");
    }
  }
);

router.get("/info/:webLink", async (req: Request, res: Response) => {
  const { webLink } = req.params;

  const pageData = await prisma.page.findFirst({
    where: {
      webLink,
    },
  });

  if (!pageData)
    return res.status(400).send("failed to get data with that link");

  const columnData = await prisma.column.findMany({
    where: {
      pageId: pageData.id,
    },
  });

  if (!columnData)
    return res.status(400).send("failed to get columns data with that link");

  const dataToReturn = {
    title: pageData?.name,
    backgroundColor: pageData?.backgroundColor,
    textFieldBackgroundColor: pageData?.textFieldBackgroundColor,
    textColor: pageData?.textColor,
    buttonColor: pageData?.buttonColor,
    headingColor: pageData?.headingColor,
    logoLink: pageData?.logoLink,
    backgroundImageLink: pageData?.backgroundImageLink,
    fontFamily: pageData?.fontFamily,
    clubId: pageData?.organisationId,
  };

  return res.status(200).send(dataToReturn);
});

export default router;
