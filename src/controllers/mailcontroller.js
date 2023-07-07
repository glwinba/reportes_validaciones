import config from "../config.js";
import transporter from "../configs/mailconfig.js";

const sendMail = () =>
    new Promise((resolve, reject) => {
        
        let mailOptions = {
            from: config.MAIL_USER,
            to: "crodriguez@glwinba.com",
            subject: `GLWINBA / REPORTES VALIDACIONES ${new Date().toLocaleDateString('es-MX')}`,
            html: "<p>Buen día. <br> Adjunto reportes de validaciones para el día de hoy. <br> Saludos.</p>",
            attachments: [
                {
                    filename: "prueba.xlsx",
                    path: `${__dirname}/excels/prueba.xlsx`
                }
            ]
            // cc: mailcc
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else resolve(info);
        });
    });


export default sendMail