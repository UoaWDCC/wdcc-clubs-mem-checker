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
      throw new Error('Organisation already exists');
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
    return res
      .status(400)
      .send(`Error creating club ${clubName}, please try a unique name`);
  }
});

router.get(
  '/verify-invite-code/:token',
  auth,
  async (req: Request, res: Response) => {
    //Endpoint
    try {
      const token = req.params.token as string;
      const JWT_SECRET = process.env.JWT_SECRET as string;

      interface Organisation {
        organisationId: string;
      }

      if (token !== "12345") {
        throw new Error("invalid token");
      }

      //Check that token is correct with jwt.verify();
      // let organisation: Organisation = (await jwt.verify(
      //   token,
      //   JWT_SECRET
      // )) as Organisation;
      // const organisationId = parseInt(organisation.organisationId);

      const organisationId = 1;

      //Get the data from it
      const userId: number = req.body.user.id;

      const User = await prisma.usersInOrganisation.upsert({
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
      return res.status(200).send(`successfully added user to organisation`);
    } catch (err) {
      return res.status(400).send(`invalid token`);
    }
  }
);

export default router;
