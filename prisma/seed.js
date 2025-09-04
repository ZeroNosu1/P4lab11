import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password,
      role: 'admin', // กำหนดให้เป็น admin
    },
  });
  console.log('Admin user created');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
