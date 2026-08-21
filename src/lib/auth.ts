import "server-only";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const COOKIE_NAME = "admin_token";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Set it in .env.local.`
    );
  }
  return value;
}

// Hash both sides to fixed-length buffers first, so timingSafeEqual never throws
// on a length mismatch and comparison time doesn't leak the secret's length.
function safeEqual(a: string, b: string): boolean {
  const bufA = createHash("sha256").update(a).digest();
  const bufB = createHash("sha256").update(b).digest();
  return timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(username: string, password: string): boolean {
  return (
    safeEqual(username, requiredEnv("ADMIN_USERNAME")) &&
    safeEqual(password, requiredEnv("ADMIN_PASSWORD"))
  );
}

export function adminSecret(): string {
  return requiredEnv("ADMIN_SECRET");
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return token ? safeEqual(token, adminSecret()) : false;
}

export async function requireAdminOr401(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
