import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Next.js loads .env.local itself, but standalone scripts (seed.ts) run outside
// Next's runtime, so load it here too — a harmless no-op when already loaded.
try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local not present — rely on process.env being set another way
}

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL. Run `vercel env pull .env.local` or set it manually.");
}

const client = postgres(process.env.POSTGRES_URL);
export const db = drizzle(client, { schema });
