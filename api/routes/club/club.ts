import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.post('/create', auth, async (req, res) => {
  const { clubName, clubAcronym } = req.body;
  const userId = req.body.user.id;

  console.log(
    `clubName: ${clubName}, clubAcronym: ${clubAcronym}, userId: ${userId}`
  );

  if (!clubName || !clubAcronym) {
    return res
      .status(400)
      .send('clubName and clubAcronymn are required body fields');
  }

  const organisation = await prisma.organisation.create({
    data: {
      name: clubName,
      acronym: clubAcronym,
    },
  });
  // console.log(`Created organisation ${organisation}`);
  const userInOrganisation = await prisma.usersInOrganisation.create({
    data: {
      userId,
      organisationId: organisation.id,
    },
  });
  // console.log(`userInOrganisation ${userInOrganisation}`);
  return res
    .status(200)
    .send(
      `created club ${clubName} with acronym ${clubAcronym} and added user`
    );
});

export default router;
