import nodemailer from "nodemailer";
import config from "../config.js";

export const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  service: config.MAIL_SERVICE,
  secure: true,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});

export const transporterPrivate = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  service: config.MAIL_SERVICE,
  secure: true,
  auth: {
    user: config.MAIL_USER_PRIVATE,
    pass: config.MAIL_PASS_PRIVATE
  }
});

