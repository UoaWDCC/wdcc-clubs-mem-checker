// import { google } from 'googleapis';
//
// const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
// const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';
// const SCOPES = ['profile', 'email'];
//
// const auth = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
// );
//
// function getAuthUrl() {
//     return auth.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES
//     });
// }
//
// interface UserInfo {
//     name: string | null | undefined;
//     email: string;
// }
//
// async function getUserInfo(code: string): Promise<UserInfo> {
//     const { tokens } = await auth.getToken(code);
//     auth.setCredentials(tokens);
//     const oauth2 = google.oauth2('v2');
//     const userInfo = await oauth2.userinfo.get({ auth });
//     return {
//         name: userInfo.data.name as string,
//         email: userInfo.data.email as string
//     };
// }

import express from 'express';
import { google } from 'googleapis';

const router = express.Router();

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile'];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

router.get('/auth/google', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
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
        res.json({ user: data, tokens });
    } catch (error) {
        console.error('Error retrieving access token', error);
        res.status(500).send('Error retrieving access token');
    }
});

