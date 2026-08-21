import { NextResponse } from "next/server";
import { verifyCredentials, adminSecret, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Ungültige Zugangsdaten" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, adminSecret(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
