import fs from "fs";
import { dataZip } from "../arreglos/reports";
import logger from "../configs/logger";
import { notificationMailError } from "./notificationcontroller";

export const removeFiles = async (files) => {
  for (const file of files) {
    fs.rm(file, function (err) {
      if (err) notificationMailError(`Error al remover el file: ${file} error: ${err}`);
    });
  }
  logger.info(`Se removieron correctamente todos los archivos generados.`)
};

export const removeZip = async (files) => {

  for (const data of dataZip) {
    fs.rm(data.name, function (err) {
      if (err) notificationMailError(`Archivo ZIP no se pude eliminar ${err}`);
      else logger.info("Archivo ZIP borrado correctamente del servidor.");
    });  
  } 

};

export const fileZipExist = async () => {
  
}
