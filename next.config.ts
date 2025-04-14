import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  env: {
    INSTAGRAM_API_URL: 'https://rocketapi-for-developers.p.rapidapi.com/instagram',
    INSTAGRAM_API_HEADER_HOST: 'rocketapi-for-developers.p.rapidapi.com',
    INSTAGRAM_RAPIDAPI_KEY: 'a402d1c762msh1c0733f2701dafcp1e0ae5jsn21571b31dd9b'
  },
};

export default nextConfig;
