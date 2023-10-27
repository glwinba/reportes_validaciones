import xl from "excel4node";
import path from "path";
import { dateFilesReports, formatDate } from "../helpers/dateFormat.js";
import logger from "../configs/logger.js";
import {
  cabeceraLuareate,
  cellsExcel,
  cellsExcelFileValidate,
  cellsExcelLaureate,
  headboardFileValidate,
  mailCabecera,
  styleCabeceras,
  styleCells,
} from "../arreglos/reports.js";
import { notificationMailError } from "./notificationcontroller.js";
import { addColumn } from "../helpers/addColumnLaureate.js";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
export const createExcel = (data, reportSelect, dateFileName) =>
  new Promise((resolve, reject) => {
    logger.info(`Se esta creando el excel ${reportSelect.nombre}`);

    const namePath = `${reportSelect.nombre}_${dateFileName}.xlsx`;
    let cabeceras;
    let cells_excel;
    if (reportSelect.id != 2) {
      cabeceras = mailCabecera();
      cells_excel = cellsExcel();
    } else {
      cabeceras = mailCabecera(true);
      cells_excel = cellsExcel(true);
    }
    let pathExcel = path.join(`${__dirname}/../files/${namePath}`);

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet(reportSelect.nombre);
    let style = wb.createStyle(styleCells());
    const styleEstatus = (estatus) => {
      return wb.createStyle(styleCells(estatus));
    };
    let style_cabeceras = wb.createStyle(styleCabeceras);

    for (let a = 0; a < cabeceras.length; a++) {
      ws.cell(1, a + 1)
        .string(cabeceras[a])
        .style(style_cabeceras);
    }

    ws.row(1).filter();

    for (let a = 0; a < data.length; a++) {
      let fecha_carga = formatDate(data[a].FECHA_CARGA);
      let fecha_validacion = formatDate(data[a].FECHA_VALIDACION);

      for (let cells = 0; cells < cells_excel.length; cells++) {
        const element = cells_excel[cells];
        if (
          element.nombre === "fecha_carga" ||
          element.nombre === "fecha_validacion"
        ) {
          if (element.nombre === "fecha_carga") {
            ws.cell(a + 2, cells + 1)
              .string(fecha_carga)
              .style(style);
          } else {
            ws.cell(a + 2, cells + 1)
              .string(fecha_validacion)
              .style(style);
          }
        } else {
          if (element.type != "string") {
            if (reportSelect.nombre === "FEMCO_REPORTE_VALIDACION") {
              if (element.nombre === "ESTATUS") {
                ws.cell(a + 2, cells + 1)
                  .number(data[a][element.nombre])
                  .style(styleEstatus(data[a][element.nombre]));
              } else {
                ws.cell(a + 2, cells + 1)
                  .number(data[a][element.nombre])
                  .style(style);
              }
            } else {
              ws.cell(a + 2, cells + 1)
                .number(data[a][element.nombre])
                .style(style);
            }
          } else {
            if (
              element.nombre === "NUMERO_REGISTRO" ||
              element.nombre === "FECHA_REGISTRO"
            ) {
              ws.cell(a + 2, cells + 1)
                .string(" ")
                .style(style);
            } else {
              ws.cell(a + 2, cells + 1)
                .string(data[a][element.nombre])
                .style(style);
            }
          }
        }
      }
    }

    wb.write(pathExcel, (error, stats) => {
      if (error) {
        notificationMailError(`Error al escribir el excel: ${error}`);
        reject(error);
      }
      logger.info("Se ah generado el documento correctamente...!!!");
      resolve([pathExcel, namePath]);
    });
  });

export const excelCreateSpecial = (data) =>
  new Promise((resolve, reject) => {
    logger.info(`Se esta creando el excel FEMSA - VALIDACIONES - ESPECIAL`);
    const date = dateFilesReports();
    const namePath = `FEMSA - Validaciones ${date} - ESPECIAL.xlsx`;
    const pathExcel = path.join(`${__dirname}/../files/${namePath}`);

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet("HOJA 1");
    let style = wb.createStyle(styleCells());
    let style_cabeceras = wb.createStyle(styleCabeceras);

    let cabecerasArray = headboardFileValidate("REGIMEN_ESPECIAL");
    for (let a = 0; a < cabecerasArray.length; a++) {
      ws.cell(1, a + 1)
        .string(cabecerasArray[a])
        .style(style_cabeceras);
    }
    let cellsExcel = cellsExcelFileValidate("REGIMEN_ESPECIAL");
    for (let a = 0; a < data.length; a++) {
      let fecha_carga = formatDate(data[a].FECHA_CARGA);

      for (let cells = 0; cells < cellsExcel.length; cells++) {
        const element = cellsExcel[cells];
        if (element.nombre === "fecha_carga") {
          ws.cell(a + 2, cells + 1)
            .string(fecha_carga)
            .style(style);
        } else {
          if (element.type != "string") {
            ws.cell(a + 2, cells + 1)
              .number(data[a][element.nombre])
              .style(style);
          } else {
            ws.cell(a + 2, cells + 1)
              .string(data[a][element.nombre])
              .style(style);
          }
        }
      }
    }

    wb.write(pathExcel, (error, stats) => {
      if (error) {
        notificationMailError(
          `Error al escribir el excel FEMSA - Validaciones ${date} - ESPECIAL.xlsx: ${error}`
        );
        reject(error);
      }
      logger.info("Se ah generado el documento correctamente...!!!");
      resolve([pathExcel, namePath]);
    });
  });

export const excelCreateInternalValidations = (data) =>
  new Promise((resolve, reject) => {
    logger.info(`Se esta creando el excel FEMSA - VALIDACIONES`);
    const date = dateFilesReports();
    const namePath = `GLWINBA - Validaciones ${date}.xlsx`;
    const pathExcel = path.join(`${__dirname}/../files/${namePath}`);

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet("HOJA 1");
    let style = wb.createStyle(styleCells());
    let style_cabeceras = wb.createStyle(styleCabeceras);
    let cabecerasArray = headboardFileValidate("Validador");

    for (let a = 0; a < cabecerasArray.length; a++) {
      ws.cell(1, a + 1)
        .string(cabecerasArray[a])
        .style(style_cabeceras);
    }

    let cellsExcel = cellsExcelFileValidate("Validador");

    let numero_repartir = data.length / 8;

    let entero = Math.trunc(numero_repartir);

    for (let a = 0; a < data.length; a++) {
      let fecha_carga = formatDate(data[a].FECHA_CARGA);

      for (let cells = 0; cells < cellsExcel.length; cells++) {
        const element = cellsExcel[cells];
        if (element.nombre === "fecha_carga") {
          ws.cell(a + 2, cells + 1)
            .string(fecha_carga)
            .style(style);
        } else if (element.nombre === "Validador") {
          if (a + 1 <= entero) {
            ws.cell(a + 2, cells + 1)
              .string("Cesar")
              .style(style);
          } else if (a + 1 > entero && a + 1 <= entero * 2) {
            ws.cell(a + 2, cells + 1)
              .string("Arantxa")
              .style(style);
          } else if (a + 1 > entero * 2 && a + 1 <= entero * 3) {
            ws.cell(a + 2, cells + 1)
              .string("Dana")
              .style(style);
          } else if (a + 1 > entero * 3 && a + 1 <= entero * 4) {
            ws.cell(a + 2, cells + 1)
              .string("Brian")
              .style(style);
          } else if (a + 1 > entero * 4 && a + 1 <= entero * 5) {
            ws.cell(a + 2, cells + 1)
              .string("Dulce")
              .style(style);
          } else if (a + 1 > entero * 5 && a + 1 <= entero * 6) {
            ws.cell(a + 2, cells + 1)
              .string("Emmanuel")
              .style(style);
          } else if (a + 1 > entero * 6 && a + 1 <= entero * 7) {
            ws.cell(a + 2, cells + 1)
              .string("Luis Fernando")
              .style(style);
          } else {
            ws.cell(a + 2, cells + 1)
              .string("Rosa")
              .style(style);
          }
        } else {
          if (element.type != "string") {
            ws.cell(a + 2, cells + 1)
              .number(data[a][element.nombre])
              .style(style);
          } else {
            ws.cell(a + 2, cells + 1)
              .string(data[a][element.nombre])
              .style(style);
          }
        }
      }
    }

    wb.write(pathExcel, (error, stats) => {
      if (error) {
        notificationMailError(
          `Error al escribir el excel FEMSA - Validaciones ${date}.xlsx: ${error}`
        );
        reject(error);
      }
      logger.info("Se ah generado el documento correctamente...!!!");
      resolve([pathExcel, namePath]);
    });
  });

export const createExcelLaureate = (data) =>
  new Promise((resolve, reject) => {
    logger.info(`Se esta creando el excel de Laureate`);
    const date = dateFilesReports();
    const namePath = `LAUREATE_CUMPLIMIENTO ${date}.xlsx`;
    const cabeceras = cabeceraLuareate;
    const cells_excel = cellsExcelLaureate;

    let pathExcel = path.join(`${__dirname}/../files/${namePath}`);

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet("RESUMEN_CUMPLIMIENTO");
    let style_cells = wb.createStyle(styleCells());
    let style_cabeceras = wb.createStyle(styleCabeceras);

    let dataModified = addColumn(data);

    for (let a = 0; a < cabeceras.length; a++) {
      ws.cell(1, a + 1)
        .string(cabeceras[a])
        .style(style_cabeceras);
    }

    for (let a = 0; a < dataModified.length; a++) {
      for (let cells = 0; cells < cells_excel.length; cells++) {
        const element = cells_excel[cells];
        if (element.type != "string") {
          if (dataModified[a][element.nombre] === null) {
            ws.cell(a + 2, cells + 1)
              .string("NA")
              .style(style_cells);
          } else {
            ws.cell(a + 2, cells + 1)
              .number(dataModified[a][element.nombre])
              .style(style_cells);
          }
        } else {
          ws.cell(a + 2, cells + 1)
            .string(dataModified[a][element.nombre])
            .style(style_cells);
        }
      }
    }

    wb.write(pathExcel, (error, stats) => {
      if (error) {
        notificationMailError(`Error al escribir el excel: ${error}`);
        reject(error);
      }
      logger.info(
        "Se ah generado el documento de cumplimiento diario Laureate correctamente...!!!"
      );
      resolve([pathExcel, namePath]);
    });
  });
