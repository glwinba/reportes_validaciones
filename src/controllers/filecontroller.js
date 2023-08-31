import fs from "fs";
import logger from "../configs/logger";
import { notificationMailError } from "./notificationcontroller";

export const removeFiles = async (files) => {
  for (const file of files) {
    fs.rm(file, function (err) {
      if (err)
        notificationMailError(
          `Error al remover el file: ${file} error: ${err}`
        );
    });
  }
  logger.info(`Se removieron correctamente todos los archivos generados.`);
};

export const removeFilesReports = async (file) => {
  fs.rm(file, function (err) {
    if (err)
      notificationMailError(`Error al remover el file: ${file} error: ${err}`);
  });
  logger.info(`Se removieron correctamente todos los archivos generados.`);
};

export const fileExist = async () => {
  if (fs.existsSync(`${__dirname}/../files`)) {
    return logger.info("La carpeta esta creada correctamente.");
  }

  fs.mkdirSync(`${__dirname}/../files`, { recursive: true });

  return logger.info("La carpeta no existe pero se creo nuevamente.");
};
