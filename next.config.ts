import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Hostinger: serve static HTML from `out` — no Node /_next 503/404
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
