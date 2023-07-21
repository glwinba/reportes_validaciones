import xl from "excel4node";
import path from "path";
import { formatDate } from "../helpers/dateFormat";

export const createExcel = (data, reportSelect) => new Promise((resolve,reject)=>{
  console.log("Se esta creando el excel.", reportSelect.nombre);
  const today = new Date().toLocaleDateString("es-MX");
  let day = today.split("/")[0];
  let month = today.split("/")[1];
  let year = today.split("/")[2];

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  let pathExcel;

  if (reportSelect.id === 2) {
    pathExcel = path.join(
      `${__dirname}`,
      "excels2",
      `${reportSelect.nombre}_${year}_${month}_${day}.xlsx`
    );
  } else {
    pathExcel = path.join(
      `${__dirname}`,
      "excels",
      `${reportSelect.nombre}_${year}_${month}_${day}.xlsx`
    );
  }
  

  let wb = new xl.Workbook();
  let ws = wb.addWorksheet(`HOJA 1`);
  let style = wb.createStyle({
    font: {
      color: "#000000",
      size: 11,
    },
    border: {
      left: {
        style: "thin",
        color: "black",
      },
      right: {
        style: "thin",
        color: "black",
      },
      top: {
        style: "thin",
        color: "black",
      },
      bottom: {
        style: "thin",
        color: "black",
      },
      outline: false,
    },
  });
  let style_cabeceras = wb.createStyle({
    font: {
      color: "#ffffff",
      size: 11,
      bold: true,
    },
    fill: {
      type: "pattern",
      patternType: "solid",
      bgColor: "#4472C4",
      fgColor: "#4472C4",
    },
    border: {
      left: {
        style: "thin",
        color: "black",
      },
      right: {
        style: "thin",
        color: "black",
      },
      top: {
        style: "thin",
        color: "black",
      },
      bottom: {
        style: "thin",
        color: "black",
      },
      outline: false,
    },
  });
  ws.cell(1, 1).string("RFC_EMPRESA").style(style_cabeceras);
  ws.cell(1, 2).string("EMPRESA_CONTRATANTE").style(style_cabeceras);
  ws.cell(1, 3).string("RFC_PROVEEDOR").style(style_cabeceras);
  ws.cell(1, 4).string("RAZON_SOCIAL").style(style_cabeceras);
  ws.cell(1, 5).string("AÑO").style(style_cabeceras);
  ws.cell(1, 6).string("MES").style(style_cabeceras);
  ws.cell(1, 7).string("MES_CUMPLIMIENTO").style(style_cabeceras);
  ws.cell(1, 8).string("TIPO_DOCUMENTO").style(style_cabeceras);
  ws.cell(1, 9).string("ESTATUS").style(style_cabeceras);
  ws.cell(1, 10).string("Score").style(style_cabeceras);
  ws.cell(1, 11).string("SCORE_GLOBAL").style(style_cabeceras);
  ws.cell(1, 12).string("RECARGA").style(style_cabeceras);
  ws.cell(1, 13).string("FECHA_CARGA").style(style_cabeceras);
  ws.cell(1, 14).string("FECHA_VALIDACION").style(style_cabeceras);
  ws.cell(1, 15).string("DIAS").style(style_cabeceras);
  ws.cell(1, 16).string("SLA").style(style_cabeceras);
  ws.cell(1, 17).string("FACTURO").style(style_cabeceras);
  ws.cell(1, 18).string("PAGADO").style(style_cabeceras);
  ws.cell(1, 19).string("REGIMEN_ESPECIAL").style(style_cabeceras);

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
      reject(`Ah ocurrido el siguiente error ${ error }`);
    }
    console.log('Se ah generado el documento correctamente...!!!');
    resolve(pathExcel);
  });
  // console.log("Se descargo correctamente el archivo.", reportSelect.nombre);
  // resolve(pathExcel);
});
