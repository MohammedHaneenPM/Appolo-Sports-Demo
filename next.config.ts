import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Appolo-Sports-Demo",
  assetPrefix: "/Appolo-Sports-Demo/",
};

export default nextConfig;
