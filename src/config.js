import { config } from "dotenv";
config();

export default {
    PORT: process.env.PORT || 7000,
    DB_NAME_USER: process.env.DB_NAME_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_NAME_SCHEMA: process.env.DB_NAME_SCHEMA,
    DB_SERVER: process.env.DB_SERVER,
    MAIL_HOST: process.env.MAIL_HOST, 
    MAIL_PORT: process.env.MAIL_PORT, 
    MAIL_SERVICE: process.env.MAIL_SERVICE, 
    MAIL_USER: process.env.MAIL_USER, 
    MAIL_PASS: process.env.MAIL_PASS,
    TIME_ALERT_FIRST: process.env.TIME_ALERT_FIRST,
    TIME_ALERT_SECOND: process.env.TIME_ALERT_SECOND,
    TIME_ALERT_THIRD: process.env.TIME_ALERT_THIRD
}
