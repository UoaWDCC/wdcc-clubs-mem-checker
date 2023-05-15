import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import authRoutes from './routes/auth/google';
import OrganisationRoutes from './routes/club/club';
import auth, { maybeAuth } from './middleware/auth';

const app = express();
config(); // Dotenv init

const port = process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET!;
const sixMonths = 1000 * 60 * 60 * 24 * 182;

declare module 'express-session' {
  interface SessionData {
    token?: string;
  }
}

app.use(cors());
app.use(json());
app.use(cookieParser(cookieSecret));
app.use(
  sessions({
    secret: cookieSecret,
    cookie: {
      maxAge: sixMonths,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use('/auth/google', authRoutes);
app.use('/club', OrganisationRoutes);

app.get('/protected', auth, async (req, res) => {
  return res.send(`Hello, ${req.body.user.firstName}`);
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
