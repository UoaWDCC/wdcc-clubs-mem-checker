import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../../middleware/auth';
import jwt from 'jsonwebtoken';

export const router = Router();
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
    const existingOrganisation = await prisma.organisation.findUnique({
      where: { name: clubName },
    });
    if (existingOrganisation) {
      return res
        .status(400)
        .send(`failed to create club ${clubName} please try a unique name`);
    }
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
    return res.status(500).send(`failed to create club ${clubName}`);
  }
});

function generateRandomSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function generateUniqueCode() {
  let code = generateRandomSixDigitCode();
  let codeExists = await prisma.organisationInviteCode.findUnique({
    where: { code },
  });

  while (codeExists) {
    code = generateRandomSixDigitCode();
    codeExists = await prisma.organisationInviteCode.findUnique({
      where: { code },
    });
  }

  return code;
}

router.get(
  '/create-invite-code/:organisationId',
  auth,
  async (req: Request, res: Response) => {
    try {
      const organisationId = Number.parseInt(req.params['organisationId']);
      const JWT_SECRET = process.env.JWT_SECRET as string;
      const userId = req.body.user.id;
      const userInOrg = await prisma.usersInOrganisation.findFirst({
        where: {
          userId: userId!,
          organisationId: organisationId!,
        },
      });
      if (!userInOrg)
        return res
          .status(401)
          .send('you must be in the organisation to create a share code');
      const newUniqueInviteCode = await generateUniqueCode();
      await prisma.organisationInviteCode.create({
        data: { code: newUniqueInviteCode, organisationId },
      });
      return res.status(200).send(newUniqueInviteCode);
    } catch (err) {
      console.error(err);
      return res.status(500).send('failed to create invite code');
    }
  }
);

router.get(
  '/verify-membership-status',
  async (req: Request, res: Response) => {}
);

router.get(
  '/verify-invite-code/:token',
  auth,
  async (req: Request, res: Response) => {
    //Endpoint
    try {
      const token = req.params.token as string;

      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

      const inviteCode = await prisma.organisationInviteCode.findFirst({
        where: {
          code: token,
          createdAt: {
            gte: twoHoursAgo.toISOString(),
          },
        },
      });

      if (!inviteCode) return res.status(400).send('invite code is invalid');

      const organisationId = inviteCode.organisationId;

      //Get the data from it
      const userId: number = req.body.user.id;

      // Add user to the club
      await prisma.usersInOrganisation.upsert({
        where: {
          userId_organisationId: {
            userId: userId!,
            organisationId: organisationId!,
          },
        },
        update: {},
        create: {
          userId: userId!,
          organisationId: organisationId!,
        },
      });

      return res
        .status(200)
        .send(
          `successfully added user with id ${userId} to organisation with id ${organisationId}`
        );
    } catch (err) {
      return res.status(400).send(`invalid token`);
    }
  }
);

export default router;
