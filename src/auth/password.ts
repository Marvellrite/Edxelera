export async function hashPassword(password: string): Promise<string> {
  // TODO: Replace with bcrypt/argon2.
  return `hashed:${password}`;
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return passwordHash === `hashed:${password}`;
}