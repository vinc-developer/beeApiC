import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  reactCompiler: true,
  basePath: "/bee-apic",
};

export default nextConfig;
