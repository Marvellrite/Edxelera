import { cookies } from "next/headers";
import crypto from "crypto";
import type { AuthUser } from "@/features/_shared/types";
import { env } from "@/lib/server/env";

export type Session = { user: AuthUser };
const COOKIE = "edx_session";

function sign(payload: string) {
  return crypto.createHmac("sha256", env.authSecret).update(payload).digest("hex");
}

export function encodeSession(session: Session) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token: string): Session | null {
  const [payload, mac] = token.split(".");
  if (!payload || !mac || sign(payload) !== mac) return null;
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Session;
}

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  return decodeSession(token);
}

export async function setSessionCookie(session: Session) {
  (await cookies()).set(COOKIE, encodeSession(session), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
}
