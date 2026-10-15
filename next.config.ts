import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Allow the Freebuff preview origin for dev HMR (dev-only, harmless in prod).
  allowedDevOrigins: ["3000-ibf5wuapwc0y6w1l967hw.e2b.app"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
