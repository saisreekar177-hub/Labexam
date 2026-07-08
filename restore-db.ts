import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.faculty.updateMany({
    where: {
      employeeId: "FAC1234"
    },
    data: {
      collegeName: "Gouthami Institute of Technology and Management for Women"
    }
  });
  console.log(`RESTORED ${result.count} FACULTY RECORDS IN DATABASE.`);
  await prisma.$disconnect();
}

main().catch(console.error);
