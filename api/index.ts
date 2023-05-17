import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/auth/google';
import sheetroutes from './routes/sheets/columns';
import organisationRoutes from './routes/club/club';
import auth, { maybeAuth } from './middleware/auth';

const app = express();
config(); // Dotenv init

const port = process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET!;
const sixMonths = 1000 * 60 * 60 * 24 * 182;

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

app.get('/protected', auth, async (req, res) => {
  return res.send(`Hello, ${req.body.user.firstName}`);
});

app.get('/firstname', auth, async (req, res) => {
  return res.status(200).json({ firstName: req.body.user.firstName });
});

app.get('/', maybeAuth, async (req, res) => {
  const name = req.body.user?.firstName || 'World';
  return res.json({
    message: `Hello, ${name}!`,
  });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
