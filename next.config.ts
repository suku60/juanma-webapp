/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  basePath: "/juanma-webapp",
  assetPrefix: "/juanma-webapp/",
  typeRoots: ["./types", "./node_modules/@types"]
};

export default nextConfig;
