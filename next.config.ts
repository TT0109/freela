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
    INSTAGRAM_RAPIDAPI_KEY: 'd3d3cfca41msh4a3b455395c3d27p1eddf0jsn6c890427b214'
  },
};

export default nextConfig;
