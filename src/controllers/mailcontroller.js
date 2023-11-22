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
const htmlFileLaureate = `${__dirname}/../templates/reportes_laureate.html`;

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
    let mailConfigs;
    if (na) {
      mailConfigs = {
        from: config.MAIL_USER_PRIVATE,
        to: "acuauhtemoc@glwinba.com",
        subject: `CESE / Validaciones especiales ${date}`,
        html: htmlToSend,
        cc: ["cfonseca@glwinba.com", "eguevara@glwinba.com"],
        attachments: [
          {
            filename: pathDoc[1],
            path: pathDoc[0],
          },
        ],
      };
    } else {
      mailConfigs = {
        from: config.MAIL_USER_PRIVATE,
        to: "acuauhtemoc@glwinba.com",
        subject: `CESE / Validaciones especiales ${date}`,
        html: htmlToSend,
        cc: ["cfonseca@glwinba.com", "eguevara@glwinba.com", "rrojas@glwinba.com"],
      };
    }

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
        "gpichardo@glwinba.com",
        "rrojas@glwinba.com",
        "aespindola@glwinba.com",
        "ctecalco@glwinba.com",
        "dramirez@glwinba.com",
        "bgonzalez@glwinba.com",
        "dmorales@glwinba.com",
        "fgonzalez@glwinba.com"
      ],
      subject: `GLWINBA / Validaciones ${date}`,
      html: htmlToSend,
      cc: [
        "eavelar@garridolicona.com",
        "afernandez@glwinba.com",
        "cfonseca@glwinba.com",
        "eguevara@glwinba.com"
      ],
      attachments: attDocs(),
    };

    transporterPrivate.sendMail(mailConfigs, (error, info) => {
      if (error) {
        notificationMailError(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });

export const sendMailLaureate = (pathDoc) =>
  new Promise((resolve, reject) => {
    const htmlSync = fs.readFileSync(htmlFileLaureate, {
      encoding: "utf-8",
    });
    const template = handlebars.compile(htmlSync);
    const htmlToSend = template();

    let attachments = [
      {
        filename: pathDoc[1],
        path: pathDoc[0],
      },
    ];
    const mailConfigs = {
      from: config.MAIL_USER_PRIVATE,
      to: [
        "juan.arellanoa@laureate.mx",
        "olivia.peralta@laureate.mx",
        "eduin.jimenez@laureate.mx",
        "liliana.garcia@laureate.mx",
        "jaime.mendoza@laureate.mx",
        "diana.salgado@laureate.mx",
        "brandon.marquez@laureate.mx",
        "zuleyka.carrizalez@laureate.mx",
        "elizabeth.ruiz@laureate.mx",
        "luis.rendon@laureate.mx",
        "leticia.sanchez@laureate.mx",
        "alejandro.pineda@laureate.mx",
        "berenice.cedillo@laureate.mx",
        "aylin.calderon@laureate.mx",
        "gustavo.peralta@laureate.mx",
        "tania.azua@laureate.mx",
        "cristhian.bermejo@laureate.mx",
        "carla.lara@laureate.mx",
        "alba.paniagua@laureate.mx",
        "rocio.jimenez@laureate.mx",
        "viridiana.sanchez@laureate.mx",
        "itzel.badillo@laureate.mx",
        "paola.magallon@laureate.mx"
      ],
      subject: `LAUREATE / REPORTE DE CUMPLIMIETO AL DIA`,
      html: htmlToSend,
      cc: [
        "eavelar@garridolicona.com",
        "afernandez@glwinba.com",
        "cfonseca@glwinba.com",
      ],
      attachments: attachments,
    };

    transporterPrivate.sendMail(mailConfigs, (error, info) => {
      if (error) {
        notificationMailError(`Error en el envio de mail ${error}`);
        reject(error);
      } else resolve(info);
    });
  });
