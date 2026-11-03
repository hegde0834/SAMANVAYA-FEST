import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getResolvedDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;

  // If explicitly configured for PostgreSQL, use that URL directly
  if (envUrl && (envUrl.startsWith("postgres://") || envUrl.startsWith("postgresql://"))) {
    return envUrl;
  }

  // If in Vercel or serverless read-only environment:
  // Copy the starter SQLite database from repo to /tmp (which is writable in Lambda)
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = "/tmp/dev.db";
    if (!fs.existsSync(tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            break;
          } catch (err) {
            console.warn("Could not copy sqlite to /tmp:", err);
          }
        }
      }
    }
    return `file:${tmpDbPath}`;
  }

  // Local development
  return envUrl || "file:./dev.db";
}

const resolvedUrl = getResolvedDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
