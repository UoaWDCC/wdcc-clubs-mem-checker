import { Router } from 'express';
import { PrismaClient} from '@prisma/client'
<<<<<<< HEAD
=======
import auth from '../../middleware/auth';
>>>>>>> 865ae64637cbf90c5ceeffae344b9988b2e0e71b

const router = Router();
const prisma = new PrismaClient();

<<<<<<< HEAD

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
=======
router.post('/create', auth, async (req, res) => {

const {clubName, clubAcronym} = req.body;
const user = req.body.user.id;

if (!clubName || !clubAcronym) {
    return res.status(400).send("clubName and clubAcronymn are required body fields");
}

const organisation = await prisma.organisation.create({
    data: {
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
    return res.status(200);
});
>>>>>>> 865ae64637cbf90c5ceeffae344b9988b2e0e71b

export default router;