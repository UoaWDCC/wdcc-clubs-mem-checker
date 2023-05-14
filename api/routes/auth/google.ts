import { Router } from 'express';
import { google } from 'googleapis';
import { sign } from 'jsonwebtoken';
import { PrismaClient} from '@prisma/client'

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

export const oAuth2Client = new google.auth.OAuth2(
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

 router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
    const { data } = await oauth2.userinfo.get();

    const token = sign({
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email,
      googleToken: tokens.access_token,
    }, JWT_SECRET!)


    const user = await prisma.user.upsert({
      where: { email: data.email! },
      update: {},
      create: {
        firstName: data.given_name!,
        lastName: data.family_name!,
        email: data.email!,
        profilePicture:  data.picture!,
        googleToken:  tokens.access_token!
      }
    });

    return res.status(200).json({
      token,
    });


    res.json({ user: data, tokens });
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Error retrieving access token');
  }
});

export default router;
