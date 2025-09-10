// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      // Desliga o cache em disco que causa o ENOENT no Windows
      config.cache = false; // ou: { type: "memory" }
    }
    return config;
  },
};

export default nextConfig;
