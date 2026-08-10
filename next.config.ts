import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Evita o Next.js subir até C:\Users\pc (há um package-lock.json solto lá)
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
