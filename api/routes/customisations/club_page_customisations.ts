import express, { Request, Response } from 'express';
import {PrismaClient, User} from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();
const router = express.Router();

interface PageCustomization {
    name: string;
    organisationId: number;
    sheetId: string;
    webLink: string;
    backgroundColor?: string | undefined;
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

        const { name, organisationId, sheetId, webLink, ...rest } = customization;

        const page = await prisma.page.create({
            data: {
                name,
                organisationId,
                sheetId,
                webLink,
                ...rest,
            },
        });

        const pathId = nanoid(); // Generate random path ID

        // Store the path ID in the database for the created page
        await prisma.page.update({
            where: { id: page.id },
            data: { webLink: pathId},
        });

        res.status(200).json({ pathId });
    } catch (error) {
        console.error('Error creating page:', error);
        res.status(500).json({ error: 'Error creating page' });
    }
});

export default router;