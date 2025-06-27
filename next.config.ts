import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    LIARA_ENDPOINT: process.env.LIARA_ENDPOINT,
    LIARA_ACCESS_KEY_ID: process.env.LIARA_ACCESS_KEY_ID,
    LIARA_SECRET_KEY: process.env.LIARA_SECRET_KEY,
    LIARA_BUCKET_NAME: process.env.LIARA_BUCKET_NAME,
  },
  images: {
    domains: ['c961427.parspack.net','uploade.storage.iran.liara.space'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c961427.parspack.net',
      },
      {
        protocol: 'http',
        hostname: 'c961427.parspack.net',
      },{
        protocol: 'https',
        hostname: 'c713657.parspack.net',
      },
      {
        protocol: 'http',
        hostname: 'c713657.parspack.net',
      },
      {
        protocol: "https",
        hostname: "uploads.storage.iran.liara.space",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "marloo.storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
    ],

  },
};

export default nextConfig;


