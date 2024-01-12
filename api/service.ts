import { google } from 'googleapis';

const getServiceClient = () => {
  const serviceAccountJsonBase64: string | undefined =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;

  const serviceAccount =
    serviceAccountJsonBase64 &&
    JSON.parse(Buffer.from(serviceAccountJsonBase64!, 'base64').toString());

  const bodyInfo =
    serviceAccount != undefined
      ? {
          credentials: serviceAccount,
          scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/documents',
          ],
        }
      : {
          keyFile: 'membership-checker-e5457b93d746.json',
          scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/documents',
          ],
        };
  return new google.auth.GoogleAuth(bodyInfo);
};

const serviceClient = getServiceClient();

export default serviceClient;
