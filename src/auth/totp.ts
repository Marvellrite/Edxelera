import { authenticator } from "otplib";
import crypto from "crypto";

export function createTotpSecret(email: string) {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(email, "EdXelera", secret);
  return { secret, otpauth };
}

export function verifyTotpToken(secret: string, token: string) {
  return authenticator.verify({ secret, token });
}

export function generateRecoveryCodes() {
  return Array.from({ length: 8 }).map(() => crypto.randomBytes(4).toString("hex"));
}
