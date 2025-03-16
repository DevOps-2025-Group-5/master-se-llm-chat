import dotenv from "dotenv";

dotenv.config();

export const studentDbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  rootpassword: process.env.MYSQL_ROOT_PASSWORD,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: "mysql",
};

export const userDbConfig = {
  host: process.env.USERDB_MYSQL_HOST,
  user: process.env.USERDB_MYSQL_USER,
  rootpassword: process.env.USERDB_MYSQL_ROOT_PASSWORD,
  password: process.env.USERDB_MYSQL_PASSWORD,
  database: process.env.USERDB_MYSQL_DATABASE,
  dialect: "mysql",
};
