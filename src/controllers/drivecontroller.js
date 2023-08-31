import { google } from "googleapis";
import { notificationMailError } from "./notificationcontroller";
import logger from "../configs/logger";
import fs from "fs";
import config from "../config.js";

const SCOPE = ["https://www.googleapis.com/auth/drive"];

const authorize = async () => {
  logger.info("Se esta autenticando el usuario de Google...");
  const jwtClient = new google.auth.JWT(
    config.CLIENT_EMAIL,
    null,
    config.PRIVATE_KEY,
    SCOPE
  );

  try {
    await jwtClient.authorize();
    logger.info("Se autentico el usuario correctamente...");
    return jwtClient;
  } catch (error) {
    return notificationMailError(
      `Error al autenticar usuario de Google: ${error}`
    );
  }
};

const uploadFilesDocsValidations = (authClient, pathDoc) => {
  return new Promise((resolve, rejected) => {
    logger.info("Se esta subiendo el documento a la carpeta de drive...!!!");
    const drive = google.drive({ version: "v3", auth: authClient });

    var fileMetaData = {
      name: pathDoc[1],
      parents: ["1EYlCfAXex_Kg9ckuKWA4ClmsNwQ_GX-k"],
    };

    drive.files.create(
      {
        resource: fileMetaData,
        media: {
          body: fs.createReadStream(pathDoc[0]),
          mimeType: "*/*",
        },

        fields: "id",
        supportsAllDrives: true,
      },
      function (error, file) {
        if (error) {
          return rejected(
            notificationMailError(`Error al subir documentos a drive: ${error}`)
          );
        }
        logger.info("Se subio el archivo correctamente..!!!");
        resolve(file);
      }
    );
  });
};

export const uploadDrive = async (pathDoc) => {
  try {
    const auth = await authorize();
    await uploadFilesDocsValidations(auth, pathDoc);
  } catch (error) {
    notificationMailError(`Error al subir documentos a drive: ${error}`);
  }
};
