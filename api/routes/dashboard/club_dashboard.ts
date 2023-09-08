import { Router, Request, Response } from "express";
import {
  Column as DBColumn,
  Page as DBPage,
  MembershipCheckUsage,
  PrismaClient,
} from "@prisma/client";
import IColumn from "../../../client/src/types/IColumn";
import IPage from "../../../client/src/types/IPage";
import auth from "../../middleware/auth";
import jwt from "jsonwebtoken";
import { Metric } from "@prisma/client/runtime";
import IPageMetrics from "../types/IPageMetrics";
import IDashboardPage from "../types/IDashboardPage";
import { google } from "googleapis";

const router = Router();
const prisma = new PrismaClient();

const getMetrics = (
  pageId: number,
  allCheckerUsages: MembershipCheckUsage[]
) => {
  const filterByRange = (
    checkerUsage: MembershipCheckUsage[],
    dateRange: [Date, Date]
  ) => {
    return checkerUsage.filter(
      (checkerUsage) =>
        checkerUsage.createdAt > dateRange[0] &&
        checkerUsage.createdAt < dateRange[1]
    );
  };

  const currentDateTime = new Date();
  const lastDayRange: [Date, Date] = [
    new Date(currentDateTime.getTime() - 24 * 60 * 60 * 1000),
    currentDateTime,
  ];
  const last7DaysRange: [Date, Date] = [
    new Date(currentDateTime.getTime() - 7 * 24 * 60 * 60 * 1000),
    currentDateTime,
  ];
  const last30DaysRange: [Date, Date] = [
    new Date(currentDateTime.getTime() - 30 * 24 * 60 * 60 * 1000),
    currentDateTime,
  ];

  const allTimeCheckerPageUsage = allCheckerUsages.filter(
    (checkerUsage) => checkerUsage.pageId === pageId
  );
  const lastDayCheckerPageUsage = filterByRange(
    allTimeCheckerPageUsage,
    lastDayRange
  );
  const last7DaysCheckerPageUsage = filterByRange(
    allTimeCheckerPageUsage,
    last7DaysRange
  );
  const last30DaysCheckerPageUsage = filterByRange(
    allTimeCheckerPageUsage,
    last30DaysRange
  );

  const metrics = {
    allTime: {
      numberOfChecks: allTimeCheckerPageUsage.length,
      numberOfDuplicates: allTimeCheckerPageUsage.filter(
        (checkerUsage) => checkerUsage.isDuplicate
      ).length,
    },
    lastDay: {
      numberOfChecks: lastDayCheckerPageUsage.length,
      numberOfDuplicates: lastDayCheckerPageUsage.filter(
        (checkerUsage) => checkerUsage.isDuplicate
      ).length,
    },
    last7Days: {
      numberOfChecks: last7DaysCheckerPageUsage.length,
      numberOfDuplicates: last7DaysCheckerPageUsage.filter(
        (checkerUsage) => checkerUsage.isDuplicate
      ).length,
    },
    last30Days: {
      numberOfChecks: last30DaysCheckerPageUsage.length,
      numberOfDuplicates: last30DaysCheckerPageUsage.filter(
        (checkerUsage) => checkerUsage.isDuplicate
      ).length,
    },
  };

  return metrics;
};

router.get(
  "/club-dashboard-endpoint/:organisationId",
  auth,
  async (req: Request, res: Response) => {
    try {
      const organisationId = Number.parseInt(req.params["organisationId"]);
      const JWT_SECRET = process.env.JWT_SECRET as string;

      const allCheckerUsages = await prisma.membershipCheckUsage.findMany();

      // retrieve organisation
      const organisation = await prisma.organisation.findUnique({
        where: {
          id: organisationId,
        },
      });
      if (!organisation)
        return res.status(404).send("no organisation found with that id");

      // retrieve checker pages for organisation
      const pagesInOrg = await prisma.page.findMany({
        where: {
          organisationId: organisationId!,
        },
      });
      // retrieve google sheets columns for all checker pages
      const columns: DBColumn[] = await prisma.column.findMany();

      if (!pagesInOrg)
        return res
          .status(404)
          .send("you must be in the organisation to have checker pages");

      const convertedPages: (IPage & { weblink: String; metrics: any })[] =
        pagesInOrg.map((page: DBPage) => {
          const convertedColumns: IColumn[] = columns
            .filter((column: DBColumn) => page.id === column.pageId)
            .map((column: DBColumn) => {
              const convertedColumn: IColumn = {
                displayName: column.mappedTo,
                originalName: column.sheetsName,
              };
              return convertedColumn;
            });

          const convertedPage: IPage & {
            weblink: String;
            metrics: IPageMetrics;
          } = {
            id: page.id,
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

      const adminsInOrganisation = await prisma.usersInOrganisation.findMany({
        where: {
          organisationId: organisationId,
        },
        select: {
          userId: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      const clubAdmins = adminsInOrganisation.map((entry) =>
        [entry.user.firstName, entry.user.lastName].filter(Boolean).join(" ")
      );

      const dashboardPage: IDashboardPage = {
        club: organisation,
        pages: convertedPages,
        clubAdmins,
      };

      return res.status(200).send(dashboardPage);
    } catch (err) {
      console.error(err);
      return res.status(500).send("failed to create invite code");
    }
  }
);

export default router;
