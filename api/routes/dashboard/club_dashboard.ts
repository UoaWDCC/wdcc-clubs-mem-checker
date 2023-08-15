import { Router, Request, Response } from 'express';
import { Column as DBColumn, Page as DBPage, MembershipCheckUsage, Organisation, PrismaClient } from '@prisma/client';
import Column from '../../../client/src/types/Column';
import Page from '../../../client/src/types/Page'
import auth from '../../middleware/auth';
import jwt from 'jsonwebtoken';
import { Metric } from '@prisma/client/runtime';


const router = Router();
const prisma = new PrismaClient();

interface MetricRecord {
    numberOfChecks: number,
    numberOfDuplicates: number
}

interface PageMetrics {
    allTime: MetricRecord,
    lastDay: MetricRecord,
    last7Days: MetricRecord,
    last30Days: MetricRecord,
}

interface DashboardPage{
    club : Organisation // this doesn't contain the club logo, not sure where this is stored?
    pages : (Page & {
        weblink: String
        metrics: PageMetrics 
    })[]
}

const getMetrics = (pageId : number, allCheckerUsages: MembershipCheckUsage[]) => {

    const filterByRange = (checkerUsage: MembershipCheckUsage[], dateRange: [Date, Date]) => {
        return checkerUsage.filter((checkerUsage) => checkerUsage.createdAt > dateRange[0] && checkerUsage.createdAt < dateRange[1]);
    }

    const currentDateTime = new Date();
    const lastDayRange: [Date, Date] = [new Date(currentDateTime.getTime() - 24 * 60 * 60 * 1000), currentDateTime];
    const last7DaysRange: [Date, Date] = [new Date(currentDateTime.getTime() - 7 * 24 * 60 * 60 * 1000), currentDateTime];
    const last30DaysRange: [Date, Date] = [new Date(currentDateTime.getTime() - 30 * 24 * 60 * 60 * 1000), currentDateTime];

    const allTimeCheckerPageUsage = allCheckerUsages.filter((checkerUsage) => checkerUsage.pageId === pageId);
    const lastDayCheckerPageUsage = filterByRange(allTimeCheckerPageUsage, lastDayRange);
    const last7DaysCheckerPageUsage = filterByRange(allTimeCheckerPageUsage, last7DaysRange);
    const last30DaysCheckerPageUsage = filterByRange(allTimeCheckerPageUsage, last30DaysRange);

    

    const metrics = {
        allTime: {numberOfChecks: allTimeCheckerPageUsage.length,numberOfDuplicates: allTimeCheckerPageUsage.filter((checkerUsage) => checkerUsage.isDuplicate).length},
        lastDay: {numberOfChecks: lastDayCheckerPageUsage.length,numberOfDuplicates: lastDayCheckerPageUsage.filter((checkerUsage) => checkerUsage.isDuplicate).length},
        last7Days: {numberOfChecks: last7DaysCheckerPageUsage.length,numberOfDuplicates: last7DaysCheckerPageUsage.filter((checkerUsage) => checkerUsage.isDuplicate).length},
        last30Days: {numberOfChecks: last30DaysCheckerPageUsage.length,numberOfDuplicates: last30DaysCheckerPageUsage.filter((checkerUsage) => checkerUsage.isDuplicate).length},
    }

    return metrics


}

router.get(
    '/club-dashboard-endpoint/:organisationId',
    auth,
    async (req: Request, res: Response) => {
        try {
            const organisationId = Number.parseInt(req.params['organisationId']);
            const JWT_SECRET = process.env.JWT_SECRET as string;

            const allCheckerUsages = await prisma.membershipCheckUsage.findMany();

            const organisation = await prisma.organisation.findUnique({
                where: {
                    id: organisationId,
                }
            });

            if (!organisation)
                return res
                    .status(404)
                    .send('no organisation found with that id');

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

            const convertedPages: (Page & {weblink: String, metrics: any}) [] = pagesInOrg.map((page : DBPage) => {
                
                const convertedColumns : Column[] = columns.filter((column : DBColumn) => page.id === column.pageId).map((column : DBColumn) => {
                    const convertedColumn : Column = {
                        displayName: column.mappedTo,
                        originalName: column.sheetsName,
                    }
                    return convertedColumn;
                })

                const convertedPage: Page & {weblink: String, metrics: PageMetrics} = {
                  metrics: getMetrics(page.id, allCheckerUsages),  
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

              const dashboardPage : DashboardPage = {
                    club : organisation,
                    pages : convertedPages,
              }

            return res.status(200).send(dashboardPage);
        } catch (err) {
            console.error(err);
            return res.status(500).send('failed to create invite code');
        }
    }
);

export default router