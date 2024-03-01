import express, { json } from 'express';
import cors from 'cors';
import path from 'path';
import { config } from 'dotenv';
import authRoutes from './routes/auth/google';
import sheetroutes from './routes/sheets/columns';
import organisationRoutes from './routes/club/club';
import dashboardRoutes from './routes/dashboard/dashboard';
import auth, { maybeAuth } from './middleware/auth';
import pagesRoutes from './routes/pages/pages';
import verifyRoutes from './routes/verify/verify';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import userRoutes from './routes/user/user';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: true,
    exposedHeaders: ['Set-Cookie'],
  })
);
config(); // Dotenv init

const port = process.env.PORT || 3000;

const tenMinutes = 10 * 60 * 1000;
// Limits client to 300 requests per 15 minutes
const rateLimiter = rateLimit({
  windowMs: tenMinutes,
  max: 300,
});

app.use(rateLimiter);

app.use(cookieParser());

const supabaseProjectUrl = process.env.SUPABASE_PROJECT_URL!;
const supabaseApiKey = process.env.SUPABASE_API_KEY!;
export const supabase = createClient(supabaseProjectUrl, supabaseApiKey);

// Publicly serve the static files
app.use(express.static(path.join(__dirname, '../../../client/dist')));

// app.set('trust proxy', true);

app.use(json());

app.use('/api/auth/google', authRoutes);
app.use('/api/sheet/columns', sheetroutes);
app.use('/api/club', organisationRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user', userRoutes);

app.get('/api/firstname', auth, async (req, res) => {
  return res.status(200).json({ firstName: req.body.user.firstName });
});

app.get('/api/organisationid', auth, async (req, res) => {
  return res
    .status(200)
    .json({ organisationId: req.body.user.organisations.organisationId });
});

app.get('*', (req, res) => {
  if (process.env.NODE_ENV == 'production') {
    return res.sendFile(
      path.join(__dirname, '../../../client/dist/index.html')
    );
  } else {
    return res.sendFile(path.join(__dirname, '../../../client/index.html'));
  }
});
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
