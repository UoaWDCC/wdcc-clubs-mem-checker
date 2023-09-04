import { Router, Request, Response } from "express";
import {
    PrismaClient,
} from "@prisma/client";
import auth from "../../middleware/auth";
import { google } from 'googleapis';

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

const serviceClient = new google.auth.GoogleAuth({
    keyFile: "membership-checker-e5457b93d746.json",
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
    ]
})

const sheets = google.sheets({
    version: 'v4',
    auth: serviceClient,
});

router.get(
    "/:organisationId",
    auth,
    async (req: Request, res: Response) => {
        try{
            const organisationId = Number.parseInt(req.params["organisationId"]);

            const adminsInOrganisation = await prisma.usersInOrganisation.findMany({
                where: {
                    organisationId: organisationId
                },
                select: {
                    userId: true,
                    user: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            })

            const adminsList = adminsInOrganisation.map(entry => ({
                adminName: [entry.user.firstName, entry.user.lastName].filter(Boolean).join(' ')
            }))

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
                            sheetsName: true
                        }
                    }
                },
            });

            if (!pages){
                return res.status(500).send(`No Pages found for organisation ${organisationId}`);
            }

            const results = []

            for (let i = 0; i < pages.length; i++){
                const page = pages[i];

                const metadataResponse = await sheets.spreadsheets.get({
                    spreadsheetId: page.sheetId,
                });

                if (!metadataResponse.data.sheets) {
                    return res.status(400).send(JSON.stringify('spreadsheet has no sheets'));
                }

                const sheet = metadataResponse.data.sheets.find(
                    (sheet) => sheet.properties?.sheetId === Number(page.sheetTabId)
                );

                if (!sheet) {
                    return res.status(400).send(JSON.stringify('sheet not found'));
                }

                const sheetName = sheet.properties?.title;

                const totalRowsData: {
                    [pageID: string]: {UniqueColumnName: string, totalMembers: number};
                } = {};

                const range = `${sheetName}!A1:Z`;
                const {
                    data: { values },
                } = await sheets.spreadsheets.values.get({
                    spreadsheetId: page.sheetId,
                    range: range,
                });

                const columnNames = []

                for (let j = 0; j < page.identificationColumns.length; j++){
                    columnNames.push(page.identificationColumns[j].sheetsName)
                }

                if (values){
                    const headers = values[0];

                    for (let k = 0; k < headers.length; k++){

                        if (columnNames.includes(headers[k])){
                            const columnData = values.slice(1).map(row => row[k]);

                            const nonEmptyRowCount = columnData.filter((cellValue) => cellValue !== '' && cellValue !== undefined).length;

                            totalRowsData[page.id] = {
                                UniqueColumnName: headers[k],
                                totalMembers: nonEmptyRowCount
                            }
                        }
                    }
                }

                results.push(totalRowsData);
            }

            const adminNameList: object = {
                adminNames: adminsList,
                MemberCountByPageId: results,
            }

            // console.log(JSON.stringify(pages.length))

            return res.status(200).send(adminNameList);
        } catch (err) {
            console.error(err);
            return res.status(500).send("failed to retrieve list of admins");
        }
    }
)

export default router;

