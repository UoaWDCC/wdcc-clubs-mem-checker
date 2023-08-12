import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
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
            if (!pagesInOrg)
                return res
                    .status(404)
                    .send('you must be in the organisation to have checker pages');

            console.log(pagesInOrg)
        } catch (err) {
            console.error(err);
            return res.status(500).send('failed to create invite code');
        }
    }
);

export default router