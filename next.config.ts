import type { NextConfig } from "next";
import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.10.31:3000",
    "http://10.75.191.239:3000"
  ],
  turbopack: {}
};

export default withPWA(nextConfig);