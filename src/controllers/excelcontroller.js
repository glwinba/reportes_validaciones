import xl from "excel4node";
import path from "path";
import { formatDate } from "../helpers/dateFormat";
import logger from "../configs/logger";
import {
  cellsExcel,
  mailCabecera,
  styleCabeceras,
  styleCells,
} from "../arreglos/reports";
import { notificationMailError } from "./notificationcontroller";

export const createExcel = (data, reportSelect, dateFileName) =>
  new Promise((resolve, reject) => {
    logger.info(`Se esta creando el excel ${reportSelect.nombre}`);

    let pathExcel;

    if (reportSelect.id === 2 || reportSelect.id === 1) {
      pathExcel = path.join(
        `${__dirname}`,
        "excels_femco",
        `${reportSelect.nombre}_${dateFileName}.xlsx`
      );
    } else {
      pathExcel = path.join(
        `${__dirname}`,
        "excels",
        `${reportSelect.nombre}_${dateFileName}.xlsx`
      );
    }

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet("HOJA 1");
    let style = wb.createStyle(styleCells());
    const styleEstatus = (estatus) => {
      return wb.createStyle(styleCells(estatus))
    };
    let style_cabeceras = wb.createStyle(styleCabeceras);

    for (let a = 0; a < mailCabecera.length; a++) {
      ws.cell(1, a + 1)
        .string(mailCabecera[a])
        .style(style_cabeceras);
    }

    for (let a = 0; a < data.length; a++) {
      let fecha_carga = formatDate(data[a].FECHA_CARGA);
      let fecha_validacion = formatDate(data[a].FECHA_VALIDACION);

      for (let cells = 0; cells < cellsExcel.length; cells++) {
        const element = cellsExcel[cells];
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
                  .style(styleEstatus(data[a][element.nombre]));
              }
            } else {
              ws.cell(a + 2, cells + 1)
                .number(data[a][element.nombre])
                .style(style);
            }
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
        notificationMailError(`Error al escribir el excel: ${error}`);
        reject(error);
      }
      logger.info("Se ah generado el documento correctamente...!!!");
      resolve(pathExcel);
    });
  });
