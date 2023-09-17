import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";

export const router = Router();
const prisma = new PrismaClient();

router.get("/organisations", auth, async (req, res) => {
    try {
        const userOrganisations = await prisma.usersInOrganisation.findMany({
            where: {
              userId: req.body.user.id
            },
            select: {
              organisation: {
                select: {
                  id: true,
                  name: true,
                  pages: {
                    where: {
                      logoLink: { not: null }
                    },
                    take: 1,
                    select: {
                      logoLink: true
                    }
                  }
                }
              }
            }
          });

          if (!userOrganisations) {
            return res.status(204);
          }
          
          const transformedOrganisations = userOrganisations.map(org => ({
            organisationId: org.organisation.id,
            organisationName: org.organisation.name,
            logoLink: org.organisation.pages.length > 0
              ? org.organisation.pages[0].logoLink
              : null
          }));
          return res.status(200).send(transformedOrganisations);   
 
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("failed to get clubs of user");
    }
    
});

export default router;
