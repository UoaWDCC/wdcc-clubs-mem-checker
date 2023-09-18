import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import IDropdownClub from "../../../client/src/types/IDropdownClub";

export const router = Router();
const prisma = new PrismaClient();

router.get("/organisations", auth, async (req, res) => {
  try {
    const userOrganisations = await prisma.usersInOrganisation.findMany({
      where: {
        userId: req.body.user.id,
      },
      select: {
        organisation: {
          select: {
            id: true,
            name: true,
            pages: {
              where: {
                logoLink: { not: null },
              },
              take: 1,
              select: {
                logoLink: true,
              },
            },
          },
        },
      },
    });
    if (!userOrganisations) {
      return res.status(400).send("user is not in any organisations");
    }

    const transformedOrganisations: IDropdownClub[] = userOrganisations.map(
      (org) => ({
        id: org.organisation.id,
        name: org.organisation.name,
        logo:
          org.organisation.pages.length > 0
            ? org.organisation.pages[0].logoLink || undefined
            : undefined,
      })
    );
    return res.status(200).send(transformedOrganisations);
  } catch (err) {
    console.error(err);
    return res.status(500).send("failed to get clubs of user");
  }
});

export default router;
