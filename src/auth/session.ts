import type { AuthUser } from "@/features/_shared/types";

export type Session = {
  user: AuthUser;
};

export async function getSession(): Promise<Session | null> {
  // TODO: Read secure session cookie and resolve user.
  return null;
}