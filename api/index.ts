import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/auth/google';
import sheetroutes from './routes/sheets/columns';
import organisationRoutes from './routes/club/club';
import dashboardRoutes from './routes/dashboard/club_dashboard';
import auth, { maybeAuth } from './middleware/auth';
import pages from './routes/pages/pages';
import rateLimit from 'express-rate-limit';

const app = express();
config(); // Dotenv init

const port = process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET!;
const sixMonths = 1000 * 60 * 60 * 24 * 182;

const fifteenMinutes = 15 * 60 * 1000;
// Limits client to 100 requests per 15 minutes
const rateLimiter = rateLimit({
  windowMs: fifteenMinutes,
  max: 100,
});

app.use(rateLimiter);

app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(json());

app.use('/auth/google', authRoutes);
app.use('/sheet/columns', sheetroutes);
app.use('/club', organisationRoutes);
app.use('/pages', pages);
app.use('/dashboard', dashboardRoutes);

app.get('/protected', auth, async (req, res) => {
  return res.send(`Hello, ${req.body.user.firstName}`);
});

app.get('/firstname', auth, async (req, res) => {
  return res.status(200).json({ firstName: req.body.user.firstName });
});

app.get('/organisationid', auth, async (req, res) => {
  return res.status(200).json({ organisationId: req.body.user.organisations.organisationId })
})

app.get('/', maybeAuth, async (req, res) => {
  const name = req.body.user?.firstName || 'World';
  return res.json({
    message: `Hello, ${name}!`,
  });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
