import { reports } from "../arreglos/reports";
import logger from "../configs/logger";
import { dateFile } from "../helpers/dateFormat";
import {
  createExcel,
  excelCreateInternalValidations,
  excelCreateSpecial,
} from "./excelcontroller";
import {
  fileExist,
  removeFiles,
  removeFilesReports,
  removeZip,
} from "./filecontroller";
import {
  sendMailSpecialValidations,
  sendMailValidationsDaily,
} from "./mailcontroller";
import {
  notificationMail,
  notificationMailError,
} from "./notificationcontroller";
import { execSP, execSPDocsValidations, execSPSpecial } from "./spcontroller";
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
      nameFiles.push(excel[0]);
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
    if (data.length === 0) {
      return sendMailSpecialValidations(pathExcel, false);
    }
    const pathExcel = await excelCreateSpecial(data);
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
    "El proceso de creacion de reportes de validaciones especiales se a comenzado a ejecutar."
  );
  try {
    let paths_documents = [];
    const data = await execSPDocsValidations();
    const excelReporInternal = await excelCreateInternalValidations(data);
    const extraDocuments = await extraDocumentsInternals();
    await sendMailValidationsDaily(excelReporInternal, extraDocuments);
    paths_documents.push(excelReporInternal[0]);
    extraDocuments.forEach(element => {
      paths_documents.push(element[0]);
    });
    await removeFiles(paths_documents);
    logger.info(
      "******** El proceso de creacion de reportes de validaciones especiales se finalizo correctamente. **********"
    );
  } catch (error) {
    notificationMailError(`Error al generar reporte: ${error}`);
  }
};
