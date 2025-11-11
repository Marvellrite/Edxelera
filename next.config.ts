import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.10.31:3000",
    "http://10.75.191.239:3000"
  ]
};

export default nextConfig;
