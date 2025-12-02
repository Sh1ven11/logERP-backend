import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const shivenPass = await argon2.hash("shivenshiven");
  const arvindPass = await argon2.hash("arvindarvind");

  const users = [
    { username: "shiven", password: shivenPass },
    { username: "arvind", password: arvindPass }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { username: u.username },
      update: {},
      create: u
    });
  }

  console.log("Seed completed.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
