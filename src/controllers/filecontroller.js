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
  if (
    fs.existsSync(`${__dirname}/../files/excels`) &&
    fs.existsSync(`${__dirname}/../files/excels_femco`) &&
    fs.existsSync(`${__dirname}/../files/envio_validaciones`)
  ) {
    logger.info("Las carpetas estan creadas correctamente.");
  } else {
    if (!fs.existsSync(`${__dirname}/../files/excels`)) {
      fs.mkdirSync(`${__dirname}/../files/excels`, { recursive: true });
    }
    if (!fs.existsSync(`${__dirname}/../files/excels_femco`)) {
      fs.mkdirSync(`${__dirname}/../files/excels_femco`, { recursive: true });
    }
    if (!fs.existsSync(`${__dirname}/../files/envio_validaciones`)) {
      fs.mkdirSync(`${__dirname}/../files/envio_validaciones`, { recursive: true });
    }
    logger.info("Las carpetas no existen pero se crearon nuevamente.");
  }
};
