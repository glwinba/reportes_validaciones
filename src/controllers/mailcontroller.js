import config from "../config.js";
import logger from "../configs/logger.js";
import { transporter, transporterPrivate } from "../configs/mailconfig.js";
import { notificationMailError } from "./notificationcontroller.js";
import fs from "fs";
import handlebars from "handlebars";
import { dateFilesReports } from "../helpers/dateFormat.js";

const mailOptions = (typeValidate, att, htmlSend, date) => {
  return {
    from: config.MAIL_USER,
    to: "crodriguez@glwinba.com",
    subject: `GLWINBA / REPORTES VALIDACIONES ${typeValidate} ${date}`,
    html: htmlSend,
    attachments: [
      {
        filename: att,
        path: att,
      },
    ],
    cc: ["rreyes@glwinba.com", "cfonseca@glwinba.com", "eavelar@garridolicona.com"],
  };
};

const htmlFile = `${__dirname}/../templates/index.html`;
const htmlFileError = `${__dirname}/../templates/error.html`;
const htmlFileSpecialValidations = (na) => {
  if (na) return `${__dirname}/../templates/validaciones_especiales.html`;
  return `${__dirname}/../templates/validaciones_especiales_na.html`;
};

export const sendMail = (type_report, docZip, dateFileName) =>
  new Promise((resolve, reject) => {
    const htmlSync = fs.readFileSync(htmlFile, { encoding: "utf-8" });
    const template = handlebars.compile(htmlSync);
    const replacements = {
      type_report,
    };

    const htmlToSend = template(replacements);
    transporter.sendMail(
      mailOptions(type_report, docZip, htmlToSend, dateFileName),
      (error, info) => {
        if (error) {
          notificationMailError(`Error en el envio de mail ${error}`);
          reject(error);
        } else resolve(info);
      }
    );
  });

export const sendMailError = (contenido) =>
  new Promise((resolve, reject) => {
    const htmlSync = fs.readFileSync(htmlFileError, { encoding: "utf-8" });
    const template = handlebars.compile(htmlSync);
    const replacements = {
      contenido,
    };

    const htmlToSend = template(replacements);

    const mailConfigs = {
      from: config.MAIL_USER,
      to: "crodriguez@glwinba.com",
      subject: `GLWINBA / ¡ERROR! REPORTES VALIDACIONES`,
      html: htmlToSend,
      cc: ["cfonseca@glwinba.com", "eavelar@garridolicona.com", "dbetanzos@glwinba.com", "afernandez@glwinba.com"],
    };

    transporter.sendMail(mailConfigs, (error, info) => {
      if (error) {
        logger.error(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });

export const sendMailSpecialValidations = (pathDoc, na) =>
  new Promise((resolve, reject) => {
    const htmlSync = fs.readFileSync(htmlFileSpecialValidations(na), {
      encoding: "utf-8",
    });
    const template = handlebars.compile(htmlSync);
    const htmlToSend = template();
    const date = dateFilesReports();

    const mailConfigs = {
      from: config.MAIL_USER_PRIVATE,
      to: "acuauhtemoc@glwinba.com",
      subject: `CESE / Validaciones especiales ${date}`,
      html: htmlToSend,
      cc: ["cfonseca@glwinba.com"],
      attachments: [
        {
          filename: pathDoc[1],
          path: pathDoc[0],
        },
      ],
    };

    transporterPrivate.sendMail(mailConfigs, (error, info) => {
      if (error) {
        logger.error(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });
