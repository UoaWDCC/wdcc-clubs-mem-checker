import { Router, Request, Response } from 'express';
import { Column as DBColumn, Page as DBPage, PrismaClient } from '@prisma/client';
import Column from '../../../client/src/types/Column';
import Page from '../../../client/src/types/Page'
import auth from '../../middleware/auth';
import jwt from 'jsonwebtoken';


export const router = Router();
const prisma = new PrismaClient();

router.get(
    '/club-dashboard-endpoint/:organisationId',
    auth,
    async (req: Request, res: Response) => {
        try {
            const organisationId = Number.parseInt(req.params['organisationId']);
            const JWT_SECRET = process.env.JWT_SECRET as string;

            const pagesInOrg = await prisma.page.findMany({
                where: {
                    organisationId: organisationId!,
                },
            });
            const columns : DBColumn[] = await prisma.column.findMany();
                    
            if (!pagesInOrg)
                return res
                    .status(404)
                    .send('you must be in the organisation to have checker pages');

            const convertedPages: (Page & {weblink: String}) [] = pagesInOrg.map((page : DBPage) => {
                
                const convertedColumns : Column[] = columns.filter((column : DBColumn) => page.id === column.pageId).map((column : DBColumn) => {
                    const convertedColumn : Column = {
                        displayName: column.mappedTo,
                        originalName: column.sheetsName,
                    }
                    return convertedColumn;
                })

                const convertedPage: Page & {weblink: String} = {
                  weblink: page.webLink,
                  identificationColumns: convertedColumns, // Fill this with your actual Column[] data
                  title: page.name,
                  font: page.fontFamily,
                  backgroundColor: page.backgroundColor,
                  titleTextColor: page.headingColor,
                  textFieldBackgroundColor: page.textFieldBackgroundColor,
                  textFieldtextColor: page.textColor,
                  buttonColor: page.buttonColor,
                  dropDownBackgroundColor: page.backgroundColor, // Adjust this as needed
                //   logoLink: page.logoLink ? { name: page.logoLink, type: 'logo' } : File,
                //   backgroundImageLink: page.backgroundImageLink
                    // ? { name: page.backgroundImageLink, type: 'background' }
                    // : undefined,
                };
                return convertedPage;
              });

            return res.status(200).send(convertedPages);
        } catch (err) {
            console.error(err);
            return res.status(500).send('failed to create invite code');
        }
    }
);

export default router