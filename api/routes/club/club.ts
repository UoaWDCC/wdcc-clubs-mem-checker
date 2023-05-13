import { Router } from 'express';
import { PrismaClient} from '@prisma/client'
import auth from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.post('/create', auth, async (req, res) => {

console.log(req.body.user.id);
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
    return res.status(200).send();
});

export default router;