import { Router, Request, Response } from "express";
import {
    PrismaClient,
} from "@prisma/client";
import auth from "../../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

router.get(
    "/:organisationId",
    auth,
    async (req: Request, res: Response) => {
        try{
            const organisationId = Number.parseInt(req.params["organisationId"]);
            const JWT_SECRET = process.env.JWT_SECRET as string;

            const adminsInOrganisation = await prisma.usersInOrganisation.findMany({
                where: {
                    organisationId: organisationId
                },
                select: {
                    userId: true,
                    user: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            })

            const adminsList = adminsInOrganisation.map(entry => ({
                fullName: [entry.user.firstName, entry.user.lastName].filter(Boolean).join(' ')
            }))

            const adminNameList: object = {
                adminNames: adminsList
            }

            return res.status(200).send(adminNameList);
        } catch (err) {
            console.error(err);
            return res.status(500).send("failed to retrieve list of admins");
        }
    }
)

export default router;

