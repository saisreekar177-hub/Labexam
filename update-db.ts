import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const facultyResult = await prisma.faculty.updateMany({
    where: {
      NOT: {
        collegeName: "Gouthami Institute of Technology and Management for Women"
      }
    },
    data: {
      collegeName: "Gouthami Institute of Technology and Management for Women"
    }
  });
  console.log(`UPDATED ${facultyResult.count} FACULTY RECORDS IN DATABASE.`);

  const studentResult = await prisma.student.updateMany({
    where: {
      NOT: {
        collegeName: "Gouthami Institute of Technology and Management for Women"
      }
    },
    data: {
      collegeName: "Gouthami Institute of Technology and Management for Women"
    }
  });
  console.log(`UPDATED ${studentResult.count} STUDENT RECORDS IN DATABASE.`);

  await prisma.$disconnect();
}

main().catch(console.error);
