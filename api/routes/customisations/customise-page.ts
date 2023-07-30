import express, { Request, Response } from 'express';
import {PrismaClient, User} from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();
const router = express.Router();


interface PageCustomization {
    name: string;
    organisationId: number;
    sheetId: string;
    backgroundColor?: string;
    textFieldBackgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    headingColor?: string;
    logoLink?: string;
    backgroundImageLink?: string;
    fontFamily?: string;
}

router.post('/create-page', async (req: Request, res: Response) => {
    try {
        const customization: PageCustomization = req.body;

        const { name, organisationId, sheetId, ...rest } = customization;

        const pathId = nanoid(); // Generate random path ID

        const existingSheetID = await prisma.page.findUnique({
            where: { sheetId: sheetId },
          });

        if (existingSheetID) {
            return res.status(400).json({ error: 'Sheet ID already exists' });
        }

        const page = await prisma.page.create({
            data: {
              name: name, // or simply name, as they have the same name
              organisationId: organisationId,
              sheetId: sheetId,
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

        res.status(200).json({ pathId });
    } catch (error) {
        console.error('Error creating page:', error);
        res.status(400).json({ error: 'Error creating page' });
    }
});



export default router;