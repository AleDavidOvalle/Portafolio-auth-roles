import prisma from './src/config/prisma.js';
import { hashPassword } from './src/utils/password.js';

async function seedOrCheck() {
  try {
    let users = await prisma.user.findMany();
    console.log('Users in DB:', users);

    if (users.length === 0) {
      console.log('No users found, creating test user...');
      const hashed = await hashPassword('123456');
      const user = await prisma.user.create({
        data: {
          email: 'test@mail.com',
          password: hashed,
          name: 'Test User',
          role: 'USER'
        }
      });
      console.log('User created:', user);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedOrCheck();