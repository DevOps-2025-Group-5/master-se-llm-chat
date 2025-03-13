/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_ENTRYPOINT: process.env.BACKEND_ENTRYPOINT,
    BACKEND_PORT: process.env.NODE_PORT,
  },
};

export default nextConfig;
