import { google } from 'googleapis';
import { Router } from 'express';
import auth from '../../middleware/auth';
import { oAuth2Client } from '../auth/google';
import { PrismaClient } from '@prisma/client';

export const router = Router();
const prisma = new PrismaClient();

router.get('/:spreadsheetId/:sheettabid', auth, async (req, res) => {
  // Get the user so you can access the Google auth token
  const user = await prisma.user.findFirst({
    where: {
      id: req.body.user.id,
    },
  });

  if (!user) return res.status(500).send('could not find user');

  const { googleToken } = user; // Get the google auth token from the user

  // intialise credentials
  oAuth2Client.setCredentials({ access_token: googleToken });
  const { spreadsheetId, sheettabid } = req.params;
  const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
  const columnData: {
    [key: string]: { id: string; name: string; unique: boolean };
  } = {};

  try {
    // Retrieve the metadata for the spreadsheet to get the names and IDs of all sheet
    const metadataResponse = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    // If there are no sheets in the spreadsheet, return an empty object
    if (!metadataResponse.data.sheets) {
      return res.status(400).send(JSON.stringify('Spreadsheet has no sheets.'));
    }

    // Find the sheet ID that matches the given gid
    const sheet = metadataResponse.data.sheets.find(
      (sheet) => sheet.properties?.sheetId === Number(sheettabid)
    );

    // If the sheet ID is not found, return an error
    if (!sheet) {
      return res.status(400).send(JSON.stringify('Sheet not found.'));
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

    // Extract column headers. We assume the first row contains the column headers.
    if (values) {
      const headers = values[0];

      // Iterate through each column
      for (let i = 0; i < headers.length; i++) {
        const column = values.slice(1).map((row) => row[i]);
        const columnLetter = String.fromCharCode((i % 26) + 65); // A, B, C, ..., Z
        const columnName = headers[i];
        const uniqueColumName = `${columnName}_${columnLetter}`; // generate a unique column name for instances with duplicate column names
        const nonEmptyValues = column.filter(
          (value) => value !== '' && value !== undefined
        ); // removing empty rows
        const uniqueValues = new Set(nonEmptyValues); // identifying if the rows are unique
        const isUnique = nonEmptyValues.length === uniqueValues.size;
        columnData[uniqueColumName] = {
          id: columnLetter,
          name: headers[i],
          unique: isUnique,
        };
      }
    }

    return res.status(200).send(JSON.stringify(columnData));
  } catch (err) {
    console.error(err);
    return res.status(400).send(JSON.stringify('Error retrieving data.'));
  }
});

export default router;
