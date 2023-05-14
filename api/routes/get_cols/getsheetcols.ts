import {google} from "googleapis";
import { Router } from 'express';
import auth from '../../middleware/auth';
import {oAuth2Client} from "../auth/google";

export const router = Router();

router.get('/:spreadsheetId', auth, async (req, res) => {

    oAuth2Client.setCredentials({access_token: req.body.user.googleToken})
    const {  spreadsheetId } = req.params;
    const sheets = google.sheets({version: 'v4', auth: oAuth2Client});

    try {
        // Retrieve the metadata for the spreadsheet to get the names and IDs of all sheets
        const metadataResponse = await sheets.spreadsheets.get({
            spreadsheetId,
        });

        // If there are no sheets in the spreadsheet, return an empty object
        if (!metadataResponse.data.sheets) {
            return res.status(400).send(JSON.stringify('Spreadsheet has no sheets.'));
        }

        // Create an object to store the column data for each sheet
        const sheetData: { [key: string]: { [key: string]: { unique: boolean } } } = {};

        // Iterate through each sheet in the spreadsheet
        const sheetsData = await Promise.all(metadataResponse.data.sheets.map(async (sheet) => {
            const sheetId = sheet.properties!.sheetId;
            const sheetName = sheet.properties!.title;


            try {
                // Retrieve the data from the sheet
                const range = `${sheetName}!A1:Z`;
                const response = await sheets.spreadsheets.values.get({
                    spreadsheetId,
                    range,
                });

                // Extract the data from the response
                const rows = response.data.values || [];

                // Determine the columns in the sheet and whether each is unique
                const columnData: { [key: string]: { unique: boolean } } = {};
                rows[0].forEach((header, index) => {
                    const column = rows.map((row) => row[index]);
                    const isUnique = column.filter((value, i, self) => self.indexOf(value) === i).length === column.length;
                    columnData[header] = {unique: isUnique};
                });

                // Add the column data for this sheet to the sheetData object
                if (sheetName != null) {
                    sheetData[sheetName] = columnData;
                }

                return columnData;
            } catch (err) {
                return res.status(400).send(JSON.stringify(`Error retrieving data from sheet ${sheetName}:` + err));
            }
        }));

        return res.status(200).send(JSON.stringify(sheetData));

    } catch (err) {
        return res.status(400).send(JSON.stringify('Error retrieving spreadsheet metadata:' + err));
    }
});

export default router;