import config from "../config.js";
import logger from "../configs/logger.js";
import { transporter, transporterPrivate } from "../configs/mailconfig.js";
import { notificationMailError } from "./notificationcontroller.js";
import fs from "fs";
import handlebars from "handlebars";
import { dateFilesReports } from "../helpers/dateFormat.js";

const htmlFile = `${__dirname}/../templates/index.html`;
const htmlFileError = `${__dirname}/../templates/error.html`;
const htmlFileValidationsDaily = `${__dirname}/../templates/validaciones_diarias.html`;
const htmlFileValidationsCallCenter = `${__dirname}/../templates/validaciones_call_center.html`;
const htmlFileValidationsMicroformas = `${__dirname}/../templates/validaciones_microformas.html`;

const htmlFileSpecialValidations = (na) => {
  if (na) return `${__dirname}/../templates/validaciones_especiales.html`;
  return `${__dirname}/../templates/validaciones_especiales_na.html`;
};

export const sendMail = () =>
  new Promise((resolve, reject) => {
    const dateFileName = dateFilesReports();
    const htmlSync = fs.readFileSync(htmlFile, { encoding: "utf-8" });
    const template = handlebars.compile(htmlSync);
    const htmlToSend = template();

    const mailConfigs = {
      from: config.MAIL_USER,
      to: "crodriguez@glwinba.com",
      subject: `GLWINBA / REPORTES VALIDACIONES ${dateFileName}`,
      html: htmlToSend,
      cc: [
        "rreyes@glwinba.com",
        "cfonseca@glwinba.com",
        "eavelar@garridolicona.com",
      ],
    };
    transporter.sendMail(mailConfigs, (error, info) => {
      if (error) {
        notificationMailError(`Error en el envio de mail ${error}`);
        reject(error);
      } else {
        logger.info(`El correo se envio correctamente`);
        resolve(info);
      }
    });
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
      cc: [
        "cfonseca@glwinba.com",
        "eavelar@garridolicona.com",
        "dbetanzos@glwinba.com",
        "afernandez@glwinba.com",
      ],
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
        notificationMailError(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });

export const sendMailValidationsDaily = (pathDoc, pathReports) =>
  new Promise((resolve, reject) => {
    const htmlSync = fs.readFileSync(htmlFileValidationsDaily, {
      encoding: "utf-8",
    });
    const template = handlebars.compile(htmlSync);
    const htmlToSend = template();
    const date = dateFilesReports();

    const attDocs = () => {
      let attachments = [
        {
          filename: pathDoc[1],
          path: pathDoc[0],
        },
      ];
      pathReports.forEach((element) => {
        attachments.push({
          filename: element[1],
          path: element[0],
        });
      });

      return attachments;
    };
    const mailConfigs = {
      from: config.MAIL_USER_PRIVATE,
      to: [
        "cfonseca@glwinba.com",
        "gpichardo@glwinba.com",
        "rrojas@glwinba.com",
        "aespindola@glwinba.com",
        "afernandez@glwinba.com",
        "ctecalco@glwinba.com",
      ],
      subject: `FEMSA / Validaciones ${date}`,
      html: htmlToSend,
      cc: ["eavelar@garridolicona.com"],
      attachments: attDocs(),
    };

    transporterPrivate.sendMail(mailConfigs, (error, info) => {
      if (error) {
        notificationMailError(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });

export const sendMailValidationsMicroformas = (pathDoc) =>
  new Promise((resolve, reject) => {
    const htmlSync = fs.readFileSync(htmlFileValidationsMicroformas, {
      encoding: "utf-8",
    });
    const template = handlebars.compile(htmlSync);
    const htmlToSend = template();
    const date = dateFilesReports();
    const mailConfigs = {
      from: config.MAIL_USER_PRIVATE,
      to: ["cfonseca@glwinba.com", "rhllamas@microformas.com.mx"],
      subject: `Microformas / Validaciones ${date}`,
      html: htmlToSend,
      cc: ["eavelar@garridolicona.com", "afernandez@glwinba.com"],
      attachments: [
        {
          filename: pathDoc[1],
          path: pathDoc[0],
        },
      ],
    };

    transporterPrivate.sendMail(mailConfigs, (error, info) => {
      if (error) {
        notificationMailError(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });

export const sendMailValidationsCallCenter = (pathDoc) =>
  new Promise((resolve, reject) => {
    const htmlSync = fs.readFileSync(htmlFileValidationsCallCenter, {
      encoding: "utf-8",
    });
    const template = handlebars.compile(htmlSync);
    const htmlToSend = template();
    const date = dateFilesReports();
    const mailConfigs = {
      from: config.MAIL_USER_PRIVATE,
      to: [
        "dramirez@glwinba.com",
        "bgonzalez@glwinba.com",
        "eflores@glwinba.com",
        "dmorales@glwinba.com",
        "fgonzalez@glwinba.com",
      ],
      subject: `CALL CENTER GLWINBA / Validaciones ${date}`,
      html: htmlToSend,
      cc: [
        "eavelar@garridolicona.com",
        "afernandez@glwinba.com",
        "cfonseca@glwinba.com",
      ],
      attachments: [
        {
          filename: pathDoc[1],
          path: pathDoc[0],
        },
      ],
    };

    transporterPrivate.sendMail(mailConfigs, (error, info) => {
      if (error) {
        notificationMailError(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });
