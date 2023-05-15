import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
export const router = Router();
const prisma = new PrismaClient(); 

router.get("/verify-invite-code/:token", auth, async (req: Request, res: Response) => {
    //Endpoint
    try{
      const token = req.params.token as string;
      const JWT_SECRET = process.env.JWT_SECRET as string;

      interface Organisation {
        organisationId: string;
      }

      //Check that token is correct with jwt.verify();
      let organisation: Organisation = await jwt.verify(token, JWT_SECRET) as Organisation;
      const organisationId = parseInt(organisation.organisationId);
      
      //Get the data from it
      const userId: number = req.body.user.id;

      const User = await prisma.usersInOrganisation.upsert({
        where: {
          userId_organisationId: {
            userId: userId!,
            organisationId: organisationId!
          }
        },
        update: {
          
        },
        create: {
          userId: userId!,
          organisationId: organisationId!
        }
      });
      return res.status(200).send(`it works`);
    }
    catch (err) {
      return res.status(400).send(`it does not work`);
    }
    
  }
);
