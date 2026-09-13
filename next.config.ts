import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Remove basePath if deploying to username.github.io (root domain)
  // Add basePath: "/repo-name" if deploying to username.github.io/repo-name
};

export default nextConfig;
