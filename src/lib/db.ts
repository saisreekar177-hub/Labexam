import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  keepAliveInterval: any;
};

let db: PrismaClient;

if (typeof window === "undefined") {
  db = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

  // Periodically ping the database to keep it warm (every 4 minutes)
  if (!globalForPrisma.keepAliveInterval) {
    globalForPrisma.keepAliveInterval = setInterval(async () => {
      try {
        // Query a lightweight record to verify connection and keep it alive
        await db.student.findFirst({ select: { id: true } });
      } catch (e) {
        console.error("Database keep-alive ping failed:", e);
      }
    }, 4 * 60 * 1000);

    if (globalForPrisma.keepAliveInterval.unref) {
      globalForPrisma.keepAliveInterval.unref();
    }
  }
} else {
  db = null as any;
}

export { db };
