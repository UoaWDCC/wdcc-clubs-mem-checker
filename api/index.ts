import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/auth/google';
import auth from './middleware/auth';

config(); // Dotenv init
const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(json());
app.use('/auth/google', authRoutes);

app.get('/protected', auth, async (req, res) => {
  return res.send(`Hello, ${req.body.user.firstName}`);
})

app.get('/', async (req, res) => {
  return res.json({
    message: 'Hello, World!',
  });
});
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
