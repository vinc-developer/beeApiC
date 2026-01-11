import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/beeApiC",
  assetPrefix: "/beeApiC/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  //distDir: "out/beeApiC", -> pour le local
};

export default nextConfig;
