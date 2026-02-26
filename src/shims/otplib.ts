export const authenticator = {
  generateSecret() {
    return "dev-secret";
  },
  keyuri(email: string, issuer: string, secret: string) {
    return `otpauth://totp/${issuer}:${email}?secret=${secret}&issuer=${issuer}`;
  },
  verify({ secret, token }: { secret: string; token: string }) {
    return Boolean(secret) && token.length >= 6;
  },
};
