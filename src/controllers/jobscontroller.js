import { reports } from "../arreglos/reports.js";
import logger from "../configs/logger.js";
import { dateFile } from "../helpers/dateFormat.js";
import { uploadDrive } from "./drivecontroller.js";
import {
  createExcel,
  createExcelLaureate,
  excelCreateInternalValidations,
  excelCreateSpecial,
} from "./excelcontroller.js";
import { fileExist, removeFiles, removeFilesReports } from "./filecontroller.js";
import {
  sendMail,
  sendMailLaureate,
  sendMailSpecialValidations,
  sendMailValidationsDaily,
} from "./mailcontroller.js";
import { notificationMailError } from "./notificationcontroller.js";
import { execSP, execSPDocsValidations, execSPLaureate, execSPSpecial } from "./spcontroller.js";
import { getValidators } from "./validatorscontroller.js";

export const createReportsDaily = async () => {
  logger.info(
    "El proceso de creacion de reportes de validacion diario se a comenzado a ejecutar."
  );

  try {
    const dateFileName = dateFile();
    await fileExist();
    for (const report of reports) {
      const data = await execSP(report);
      const excel = await createExcel(data[0], report, dateFileName);
      await uploadDrive(excel);
      await removeFilesReports(excel[0]);
    }
    await sendMail();
  } catch (error) {
    notificationMailError(`Error al generar reporte: ${error}`);
  }

  logger.info(
    "******** El proceso de creacion de reportes de validacion diario se finalizo correctamente. **********"
  );
};

export const createDocumentSpecialValidations = async () => {
  logger.info(
    "El proceso de creacion de reportes de validaciones especiales se a comenzado a ejecutar."
  );
  try {
    await fileExist();
    const data = await execSPSpecial();
    let pathExcel = "";
    if (data.length === 0) {
      return sendMailSpecialValidations(pathExcel, false);
    }
    pathExcel = await excelCreateSpecial(data);
    await sendMailSpecialValidations(pathExcel, true);
    await removeFilesReports(pathExcel[0]);
    logger.info(
      "******** El proceso de creacion de reportes de validaciones especiales se finalizo correctamente. **********"
    );
  } catch (error) {
    notificationMailError(
      `Error al generar reporte validaciones especiales: ${error}`
    );
  }
};

const extraDocumentsInternals = async () => {
  const dateFileName = dateFile();
  let nameFiles = [];
  for (const report of reports) {
    if (report.id === 4 || report.id === 5) {
      try {
        const dataReports = await execSP(report);
        const excel = await createExcel(dataReports[0], report, dateFileName);
        nameFiles.push(excel);
      } catch (error) {
        notificationMailError(`Error al generar reportes extra: ${error}`);
      }
    }
  }
  return nameFiles;
};

export const createReportsValidationsDaily = async () => {
  logger.info(
    "El proceso de creacion de reportes de validaciones diarias se a comenzado a ejecutar."
  );
  try {
    await fileExist();
    let paths_documents = [];
    const data = await execSPDocsValidations();
    const validators = await getValidators();
    const excelReporInternal = await excelCreateInternalValidations(data, validators);
    const extraDocuments = await extraDocumentsInternals();
    await sendMailValidationsDaily(excelReporInternal, extraDocuments);
    paths_documents.push(excelReporInternal[0]);
    extraDocuments.forEach((element) => {
      paths_documents.push(element[0]);
    });
    await removeFiles(paths_documents);
    logger.info(
      "******** El proceso de creacion de reportes de validaciones diarias se finalizo correctamente. **********"
    );
  } catch (error) {
    notificationMailError(`Error al generar reporte: ${error}`);
  }
};

export const createDailyReportLaureate = async () => {
  logger.info(
    "El proceso de creacion del reporte diario de laureate se a comenzado a ejecutar."
  );
  try {
    await fileExist();
    const data = await execSPLaureate();
    const pathExcel = await createExcelLaureate(data);
    await sendMailLaureate(pathExcel);
    await removeFilesReports(pathExcel[0]);
    logger.info(
      "******** El proceso de creacion del reporte diario de laureate se finalizo correctamente. **********"
    );
  } catch (error) {
    notificationMailError(`Error al generar reporte: ${error}`);
  }
}

