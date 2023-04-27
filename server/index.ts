import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
config(); // Dotenv init

const port = process.env.PORT || 3000;
app.use(cors());
app.use(json());

app.get('/', async (req, res) => {
  return res.json({
    message: 'Hello, World!',
  });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});