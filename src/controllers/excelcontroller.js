import xl from "excel4node";
import path from "path";
import { dateFilesReports, formatDate } from "../helpers/dateFormat";
import logger from "../configs/logger";
import {
  cellsExcel,
  cellsExcelFileValidate,
  headboardFileValidate,
  mailCabecera,
  styleCabeceras,
  styleCells,
} from "../arreglos/reports";
import { notificationMailError } from "./notificationcontroller";

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
    data = data.filter((element) => element.TIPO_DOCUMENTO === "CFDI Nomina");
    logger.info(`Se esta creando el excel FEMSA - VALIDACIONES`);
    const date = dateFilesReports();
    const namePath = `FEMSA - Validaciones ${date}.xlsx`;
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

    let numero_repartir = data.length / 3;

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

export const excelCreateCallCenterReport = (data) =>
  new Promise((resolve, reject) => {
    data = data.filter((element) => element.TIPO_DOCUMENTO !== "CFDI Nomina");
    data = data.filter(
      (element) => element.TIPO_DOCUMENTO !== "Estatus de Registro"
    );
    logger.info(`Se esta creando el excel CALL CENTER GLWINBA - VALIDACIONES`);
    const date = dateFilesReports();
    const namePath = `CallCenter - Validaciones ${date}.xlsx`;
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

    for (let a = 0; a < data.length; a++) {
      if (a < 150) {
        let fecha_carga = formatDate(data[a].FECHA_CARGA);

        for (let cells = 0; cells < cellsExcel.length; cells++) {
          const element = cellsExcel[cells];
          if (element.nombre === "fecha_carga") {
            ws.cell(a + 2, cells + 1)
              .string(fecha_carga)
              .style(style);
          } else if (element.nombre === "Validador") {
            if (a + 1 <= 30) {
              ws.cell(a + 2, cells + 1)
                .string("Dana")
                .style(style);
            } else if (a + 1 > 30 && a + 1 <= 60) {
              ws.cell(a + 2, cells + 1)
                .string("Brian")
                .style(style);
            } else if (a + 1 > 60 && a + 1 <= 90) {
              ws.cell(a + 2, cells + 1)
                .string("Dulce")
                .style(style);
            } else if (a + 1 > 90 && a + 1 <= 120) {
              ws.cell(a + 2, cells + 1)
                .string("Emmanuel")
                .style(style);
            } else {
              ws.cell(a + 2, cells + 1)
                .string("Luis Fernando")
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
    }

    wb.write(pathExcel, (error, stats) => {
      if (error) {
        notificationMailError(
          `Error al escribir el excel CALL CENTER GLWINBA - Validaciones ${date}.xlsx: ${error}`
        );
        reject(error);
      }
      logger.info("Se ah generado el documento correctamente...!!!");
      resolve([pathExcel, namePath]);
    });
  });

export const excelMicroformasReport = (data) =>
  new Promise((resolve, reject) => {
    data = data.filter((element) => element.TIPO_DOCUMENTO !== "CFDI Nomina");
    data = data.filter(
      (element) => element.TIPO_DOCUMENTO !== "Estatus de Registro"
    );
    data = data.splice(150);
    logger.info(`Se esta creando el excel Microformas - VALIDACIONES`);
    const date = dateFilesReports();
    const namePath = `Microformas - Validaciones ${date}.xlsx`;
    const pathExcel = path.join(`${__dirname}/../files/${namePath}`);

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet("HOJA 1");
    let style = wb.createStyle(styleCells());
    let style_cabeceras = wb.createStyle(styleCabeceras);
    let cabecerasArray = headboardFileValidate();

    for (let a = 0; a < cabecerasArray.length; a++) {
      ws.cell(1, a + 1)
        .string(cabecerasArray[a])
        .style(style_cabeceras);
    }

    let cellsExcel = cellsExcelFileValidate();

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
          `Error al escribir el excel Microformas - Validaciones ${date}.xlsx: ${error}`
        );
        reject(error);
      }
      logger.info("Se ah generado el documento correctamente...!!!");
      resolve([pathExcel, namePath]);
    });
  });
