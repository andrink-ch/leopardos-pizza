import { defineConfig } from "drizzle-kit";

try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local not present (e.g. CI) — rely on process.env being set another way
}

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL. Run `vercel env pull .env.local` or set it manually.");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.POSTGRES_URL },
});
