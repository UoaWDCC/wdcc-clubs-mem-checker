import { Router } from 'express';
import { PrismaClient} from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();


router.get('/:clubName/:clubAcronym', async (req, res) => {

const {clubName, clubAcronym} = req.params;
const organisation = await prisma.organisation.upsert({

    where: { name: clubName},
    update: {},
    create: {
        name: clubName,
        acronym: clubAcronym
    }
})});

export default router;