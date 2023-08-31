import { config } from "dotenv";
config();

export default {
  PORT: process.env.PORT || 7000,
  DB_NAME_SCHEMA: process.env.DB_NAME_SCHEMA,
  DB_NAME_USER: process.env.DB_NAME_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SERVER: process.env.DB_SERVER,
  DB_PORT: process.env.DB_PORT,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_USER_PRIVATE: process.env.MAIL_USER_PRIVATE,
  MAIL_PASS_PRIVATE: process.env.MAIL_PASS_PRIVATE,
  CLIENT_EMAIL: process.env.CLIENT_EMAIL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  TIME_EXEC: process.env.TIME_EXEC,
  TIME_EXEC_REPORTS: process.env.TIME_EXEC_REPORTS
};
