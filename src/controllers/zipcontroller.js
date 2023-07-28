import AdmZip from "adm-zip";
import logger from "../configs/logger";
import { dataZip } from "../arreglos/reports";
import { notificationMailError } from "./notificationcontroller";

export const createZip = async () => {
  try {

    for (const data of dataZip) {
      const zip = new AdmZip();

      zip.addLocalFolder(`./src/controllers/${data.name_path}`, data.name_path);

      zip.writeZip(data.name);
    }

    logger.info("Archivos comprimidos correctamente.")

  } catch (error) {
    notificationMailError(`Error al crear ZIP ${error}`);
  }
};
