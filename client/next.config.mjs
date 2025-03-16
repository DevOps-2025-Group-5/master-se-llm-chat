/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_ENTRYPOINT: process.env.BACKEND_ENTRYPOINT,
    BACKEND_PORT: process.env.NODE_PORT,
    USERDB_MYSQL_HOST: process.env.USERDB_MYSQL_HOST,
    USERDB_MYSQL_USER: process.env.USERDB_MYSQL_USER,
    USERDB_MYSQL_PASSWORD: process.env.USERDB_MYSQL_PASSWORD,
    USERDB_MYSQL_NAME: process.env.USERDB_MYSQL_NAME,
    USERDB_MYSQL_DOCKER_PORT: process.env.USERDB_MYSQL_DOCKER_PORT,
    USERDB_MYSQL_LOCAL_PORT: process.env.USERDB_MYSQL_LOCAL_PORT,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
};

export default nextConfig;
