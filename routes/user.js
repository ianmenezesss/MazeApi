import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/user', async (req, res) => {
    try {
        const { name, senha } = req.body;

        if (!name || !senha) {
            return res.status(400).json({ error: 'Nome e senha são obrigatórios' });
        }

        const userDb = await prisma.user.findUnique({
            where: {
                name: name,
            },
        });

        if (!userDb) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const comparador = await bcrypt.compare(senha, userDb.senha);
            
        if (!comparador) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: userDb.id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.status(200).json({ token });

    } catch (e) {
        console.error('Erro ao autenticar o usuário:', e);
        res.status(500).json({ error: e.message });
    }
});

export default router;