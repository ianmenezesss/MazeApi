import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scoreRouter from './routes/scoreboard.js';
import scoreRouterNivel from './routes/scoreboardNivel.js';
import userRouter from './routes/user.js';

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://maze-phi-six.vercel.app','https://maze-game-av3.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', scoreRouter);
app.use('/', scoreRouterNivel);
app.use('/', userRouter);

app.listen(3000, () => {
  console.log('Server online em http://localhost:3000');
});