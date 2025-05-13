import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middlewares/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/scoreTop', async (req, res) => {
  try {
    const { name, score } = req.body;

    if (!name || name.length < 3 || name.length > 10) {
      return res.status(400).json({ error: 'Nome inválido. Deve ter entre 3 e 10 caracteres.' });
    }

    const scoreNumber = Number(score);

    if (isNaN(scoreNumber)) {
      return res.status(400).json({ error: 'Score inválido. Deve ser um número.' });
    }

    const newPlayer = await prisma.player.create({
      data: {
        name: name.substring(0, 10),
        score: scoreNumber,
      },
    });

    res.status(201).json(newPlayer);

  } catch (e) {
    console.error('Erro ao salvar score:', e);
    res.status(500).json({ error: 'Erro interno ao salvar score' });
  }
});

router.get('/scoreTop', auth , async (req, res) => {
  try {
    const topPlayers = await prisma.player.findMany({
      orderBy: {
        score: 'desc',
      },
      take: 10,
    });

    res.json(topPlayers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;