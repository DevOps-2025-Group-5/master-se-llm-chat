import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  rootpassword: process.env.MYSQL_ROOT_PASSWORD,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: "mysql",
};
