import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function User(name, password) {
  try {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        senha: hashedPassword, 
      },
    });

    console.log('Usuário criado:', newUser);
  } catch (error) {
    console.error('Erro:', error);
  }
}

User('adm', 'adm');