import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/beeApiC" : "",
  assetPrefix: isProd ? "/beeApiC" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/beeApiC" : "",
  },
  //distDir: "out/beeApiC", -> pour le local
};

export default nextConfig;
