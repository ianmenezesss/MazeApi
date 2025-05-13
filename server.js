import express from 'express';
import cors from 'cors';
import scoreRouter from './routes/scoreboard.js';

const corsOptions = {
  origin: ['http://localhost:5173', 'https://maze-phi-six.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', scoreRouter);

app.listen(3000, () => {
  console.log('Server online em http://localhost:3000');
});