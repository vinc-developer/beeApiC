import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // output: "export", // Retiré pour permettre les routes dynamiques admin
  basePath: isProd ? "/beeApiC" : "",
  assetPrefix: isProd ? "/beeApiC" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/beeApiC" : "",
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: "service_nhwy10n",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "template_6qc89ml",
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "9ommJjLF0Ubvg-kT7",
  },
  //distDir: "out/beeApiC", -> pour le local
};

export default nextConfig;
