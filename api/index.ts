import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import {google} from "googleapis";

config(); // Dotenv init

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';
const SCOPES = ['profile', 'email'];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(json());

app.get('/', async (req, res) => {
  return res.json({
    message: 'Hello, World!',
  });
});

app.get('/auth/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'online',
    scope: SCOPES,
  });

  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
    const { data } = await oauth2.userinfo.get();
    res.json({ user: data, tokens });
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Error retrieving access token');
  }
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
