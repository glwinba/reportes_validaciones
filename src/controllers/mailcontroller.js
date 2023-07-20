import config from "../config.js";
import transporter from "../configs/mailconfig.js";

export const sendMail = () =>
  new Promise((resolve, reject) => {
    let mailOptions = {
      from: config.MAIL_USER,
      to: "crodriguez@glwinba.com",
      subject: `GLWINBA / REPORTES VALIDACIONES ${new Date().toLocaleDateString(
        "es-MX"
      )}`,
      html: "<p>Buen día. <br> Adjunto reportes de validaciones para el día de hoy. <br> Saludos.</p>",
      attachments: [
        {
          filename: "reportes.zip",
          path: `reportes.zip`,
        },
      ],
      cc: ["amramos@glwinba.com", "cfonseca@glwinba.com"]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else resolve(info);
    });
  });

export const sendMail2 = () =>
  new Promise((resolve, reject) => {
    let mailOptions = {
      from: config.MAIL_USER,
      to: "crodriguez@glwinba.com",
      subject: `GLWINBA / REPORTES VALIDACIONES ${new Date().toLocaleDateString(
        "es-MX"
      )}`,
      html: "<p>Buen día. <br> Adjunto reportes de validaciones para el día de hoy. <br> Saludos.</p>",
      attachments: [
        {
          filename: "reportes2.zip",
          path: `reportes2.zip`,
        },
      ],
      // cc: mailcc
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else resolve(info);
    });
  });

