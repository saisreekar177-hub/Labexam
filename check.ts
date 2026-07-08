import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.faculty.findMany();
  console.log("FACULTY USERS IN DB:", JSON.stringify(users, null, 2));
  await prisma.$disconnect();
}

main().catch(console.error);
