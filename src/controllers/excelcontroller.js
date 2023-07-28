import xl from "excel4node";
import path from "path";
import { formatDate } from "../helpers/dateFormat";
import logger from "../configs/logger";
import { mailCabecera, styleCabeceras, styleCells } from "../arreglos/reports";
import { notificationMailError } from "./notificationcontroller";

export const createExcel = (data, reportSelect, dateFileName) => new Promise((resolve,reject)=>{
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
  let style = wb.createStyle(styleCells);
  let style_cabeceras = wb.createStyle(styleCabeceras);

  for(let a = 0; a < mailCabecera.length; a++){
    ws.cell(1, a+1).string(mailCabecera[a]).style(style_cabeceras);
  }

  for (let a = 0; a < data.length; a++) {
    let fecha_carga = formatDate(data[a].FECHA_CARGA);
    let fecha_validacion = formatDate(data[a].FECHA_VALIDACION);
    ws.cell(a + 2, 1)
      .string(data[a].RFC_EMPRESA)
      .style(style);
    ws.cell(a + 2, 2)
      .string(data[a].EMPRESA_CONTRATANTE)
      .style(style);
    ws.cell(a + 2, 3)
      .string(data[a].RFC_PROVEEDOR)
      .style(style);
    ws.cell(a + 2, 4)
      .string(data[a].RAZON_SOCIAL)
      .style(style);
    ws.cell(a + 2, 5)
      .number(data[a].AÑO)
      .style(style);
    ws.cell(a + 2, 6)
      .string(data[a].MES)
      .style(style);
    ws.cell(a + 2, 7)
      .string(data[a].MES_CUMPLIMIENTO)
      .style(style);
    ws.cell(a + 2, 8)
      .string(data[a].TIPO_DOCUMENTO)
      .style(style);
    ws.cell(a + 2, 9)
      .number(data[a].ESTATUS)
      .style(style);
    ws.cell(a + 2, 10)
      .string(data[a].Score)
      .style(style);
    ws.cell(a + 2, 11)
      .string(data[a].SCORE_GLOBAL)
      .style(style);
    ws.cell(a + 2, 12)
      .number(data[a].RECARGA)
      .style(style);
    ws.cell(a + 2, 13)
      .string(fecha_carga)
      .style(style);
    ws.cell(a + 2, 14)
      .string(fecha_validacion)
      .style(style);
    ws.cell(a + 2, 15)
      .number(data[a].DIAS)
      .style(style);
    ws.cell(a + 2, 16)
      .number(data[a].SLA)
      .style(style);
    ws.cell(a + 2, 17)
      .number(data[a].FACTURO)
      .style(style);
    ws.cell(a + 2, 18)
      .number(data[a].PAGADO)
      .style(style);
    ws.cell(a + 2, 19)
      .string(data[a].REGIMEN_ESPECIAL)
      .style(style);
  }
  
  wb.write(pathExcel,(error,stats)=>{
    if(error){
      notificationMailError(`Error al escribir el excel: ${ error }`);
      reject(error);
    }
    logger.info('Se ah generado el documento correctamente...!!!');
    resolve(pathExcel);
  });
});
