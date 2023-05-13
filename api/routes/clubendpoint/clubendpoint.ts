import { Router } from 'express';
import { PrismaClient} from '@prisma/client'
import auth from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/:clubName/:clubAcronym', auth, async (req, res) => {

const user = req.body.user.id; 

const {clubName, clubAcronym} = req.params;
const organisation = await prisma.organisation.upsert({

    where: { name: clubName},
    update: {},
    create: {
        name: clubName,
        acronym: clubAcronym
    }
})
await prisma.usersInOrganisation.create({
    data: {
        userId: user,
        organisationId: organisation.id
    }
    })
});



export default router;