import { Router } from 'express';
import { google } from 'googleapis';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import auth, { maybeAuth } from '../../middleware/auth';

export const router = Router();
const prisma = new PrismaClient();

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const SCOPES = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

router.get('/', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'online',
    scope: SCOPES,
  });

  res.redirect(authUrl);
});

router.post('/callback', async (req, res) => {
  const code = req.body.code || req.query.code;
  if (!code) return res.status(400).send('missing code field');

  try {
    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
    const { data } = await oauth2.userinfo.get();

    if (!data.email) {
      return res.status(503);
    }

    const user = await prisma.user.upsert({
      where: { email: data.email! },
      update: {},
      create: {
        firstName: data.given_name!,
        lastName: data.family_name!,
        email: data.email!,
        profilePicture: data.picture!,
      },
    });

    const token = sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
      },
      JWT_SECRET!
    );

    // Check if the user has any existing organisations
    const firstOrganisation = await prisma.usersInOrganisation.findFirst({
      where: {
        userId: user.id,
      },
    });

    return res
      .status(200)
      .json({
        isInClub: firstOrganisation != null,
        token,
      })
      .send();
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Error retrieving access token');
  }
});

router.get('/user-info', auth, async (req, res) => {
  return res.status(200).json(req.body.user);
});

export default router;
