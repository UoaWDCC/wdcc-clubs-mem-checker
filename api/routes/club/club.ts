import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.post('/create', auth, async (req, res) => {
    const { clubName, clubAcronym } = req.body;
    const userId = req.body.user.id;

    if (!clubName || !clubAcronym) {
        return res
            .status(400)
            .send('The club name and acronym are required body fields');
    }
    try {
        const existingOrganisation = await prisma.organisation.findUnique({where: {name: clubName}});
        if (existingOrganisation) {
          throw new Error('Organisation already exists');
        };
        const organisation = await prisma.organisation.create({
            data: {
                name: clubName,
                acronym: clubAcronym,
            },
        });
        
        const userInOrganisation = await prisma.usersInOrganisation.create({
            data: {
                userId,
                organisationId: organisation.id,
            },
        });

        return res
            .status(200)
            .send(
                `created club ${clubName} with acronym ${clubAcronym} and added user`
            );

    } catch (error) {
        console.log(error);
        return res.status(400).send(`Error creating club ${clubName}, please try a unique name`);
    }
});

export default router;
