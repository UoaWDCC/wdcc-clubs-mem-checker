import { google } from 'googleapis';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';
const SCOPES = ['profile', 'email'];

const auth = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

function getAuthUrl() {
    return auth.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
}

interface UserInfo {
    name: string | null | undefined;
    email: string;
}

async function getUserInfo(code: string): Promise<UserInfo> {
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);
    const oauth2 = google.oauth2('v2');
    const userInfo = await oauth2.userinfo.get({ auth });
    return {
        name: userInfo.data.name as string,
        email: userInfo.data.email as string
    };
}