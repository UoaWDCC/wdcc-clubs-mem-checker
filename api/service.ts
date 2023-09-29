import { google } from 'googleapis';

const serviceAccountJsonBase64: any =
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountJsonBase64, 'base64').toString()
);

export const serviceClient = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ],
});
