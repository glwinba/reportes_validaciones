import { reports } from "../arreglos/reports";
import logger from "../configs/logger";
import { dateFile } from "../helpers/dateFormat";
import { createExcel, excelCreateSpecial } from "./excelcontroller";
import {
  fileExist,
  removeFiles,
  removeFilesReports,
  removeZip,
} from "./filecontroller";
import { sendMailSpecialValidations } from "./mailcontroller";
import {
  notificationMail,
  notificationMailError,
} from "./notificationcontroller";
import { execSP, execSPSpecial } from "./spcontroller";
import { createZip } from "./zipcontroller";

export const createReportsDaily = async () => {
  logger.info(
    "El proceso de creacion de reportes de validacion diario se a comenzado a ejecutar."
  );
  let nameFiles = [];
  const dateFileName = dateFile();
  await fileExist();
  for (const report of reports) {
    try {
      const data = await execSP(report);
      const excel = await createExcel(data[0], report, dateFileName);
      nameFiles.push(excel);
    } catch (error) {
      notificationMailError(`Error al generar reporte: ${error}`);
    }
  }

  await createZip();
  await removeFiles(nameFiles);
  await notificationMail(dateFileName);
  await removeZip();
  logger.info(
    "******** El proceso de creacion de reportes de validacion diario se finalizo correctamente. **********"
  );
};

export const createDocumentSpecialValidations = async () => {
  logger.info(
    "El proceso de creacion de reportes de validaciones especiales se a comenzado a ejecutar."
  );
  try {
    const data = await execSPSpecial();
    const pathExcel = await excelCreateSpecial(data);
    await sendMailSpecialValidations(pathExcel);
    await removeFilesReports(pathExcel[0]);
  } catch (error) {
    notificationMailError(`Error al generar reporte validaciones especiales: ${error}`);
  }

  logger.info(
    "******** El proceso de creacion de reportes de validaciones especiales se finalizo correctamente. **********"
  );
};
