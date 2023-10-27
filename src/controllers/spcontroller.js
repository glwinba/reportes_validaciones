import logger from "../configs/logger.js";
import sequelize from "../database/connection.js";
import { notificationMailError } from "./notificationcontroller.js";

export const execSP = async (reportSelect) => {
  logger.info("El SP se esta ejecutando");
  try {
    let data = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = ${reportSelect.id}`
    );

    if (reportSelect.id != 5) {
      data[0].forEach((element) => {
        if (
          element.Score === "100.00 %" &&
          (element.ESTATUS === 1 || element.ESTATUS === 3)
        ) {
          element.ESTATUS = 4;
        }
      });
    }

    logger.info("El SP termino de ejecutarse");
    return data;
  } catch (error) {
    notificationMailError(`El SP tuvo un error al ejecutarse ${error}`);
  }
};

export const execSPSpecial = async () => {
  logger.info("El SP Especial se esta ejecutando");
  try {
    let data = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = 1`
    );

    let dataSla = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = 3`
    );

    data[0].forEach((element) => {
      if (
        element.Score === "100.00 %" &&
        (element.ESTATUS === 1 || element.ESTATUS === 3)
      ) {
        element.ESTATUS = 4;
      }
    });

    dataSla[0].forEach((element) => {
      if (
        element.Score === "100.00 %" &&
        (element.ESTATUS === 1 || element.ESTATUS === 3)
      ) {
        element.ESTATUS = 4;
      }
    });

    data[0] = data[0].filter(
      (element) => element.ESTATUS === 3 && element.REGIMEN_ESPECIAL != ""
    );
    dataSla[0] = dataSla[0].filter(
      (element) => element.ESTATUS === 3 && element.REGIMEN_ESPECIAL != ""
    );

    if (dataSla[0] > 0) {
      dataSla[0].forEach((element) => {
        data[0].push(element);
      });
    }

    logger.info("El SP Especial termino de ejecutarse");
    return data[0];
  } catch (error) {
    notificationMailError(
      `El SP Especial tuvo un error al ejecutarse ${error}`
    );
  }
};

export const execSPDocsValidations = async () => {
  logger.info("El SP de validaciones diario se esta ejecutando");

  try {
    let dataFemco = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = 1`
    );

    let dataSla = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = 3`
    );

    let dataUvm = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = 6`
    );

    let dataComplete = [];

    dataFemco[0].forEach((element) => {
      if (
        element.Score === "100.00 %" &&
        (element.ESTATUS === 1 || element.ESTATUS === 3)
      ) {
        element.ESTATUS = 4;
      }
    });

    dataSla[0].forEach((element) => {
      if (
        element.Score === "100.00 %" &&
        (element.ESTATUS === 1 || element.ESTATUS === 3)
      ) {
        element.ESTATUS = 4;
      }
    });

    dataUvm[0].forEach((element) => {
      if (
        element.Score === "100" &&
        (element.ESTATUS === 1 || element.ESTATUS === 3)
      ) {
        element.ESTATUS = 4;
      }
    });

    dataFemco[0] = dataFemco[0].filter(
      (element) => element.ESTATUS === 3 && element.REGIMEN_ESPECIAL === ""
    );
    dataSla[0] = dataSla[0].filter(
      (element) => element.ESTATUS === 3 && element.REGIMEN_ESPECIAL === ""
    );
    dataUvm[0] = dataUvm[0].filter(
      (element) =>
        element.ESTATUS === 3 &&
        (element.TIPO_DOCUMENTO === "Acuse IMSS" ||
          element.TIPO_DOCUMENTO === "Acuse INFONAVIT" ||
          element.TIPO_DOCUMENTO === "Acuse ISR (Retenciones por Salarios)" ||
          element.TIPO_DOCUMENTO === "CFDI Nomina" ||
          element.TIPO_DOCUMENTO === "Pago COP" ||
          element.TIPO_DOCUMENTO === "Pago INFONAVIT" ||
          element.TIPO_DOCUMENTO === "Pago ISR (Retenciones por Salarios)" ||
          element.TIPO_DOCUMENTO === "Pago IVA" ||
          element.TIPO_DOCUMENTO === "Acuse IVA")
    );

    dataFemco[0].forEach((element) => dataComplete.push(element));

    dataSla[0].forEach((element) => dataComplete.push(element));

    dataUvm[0].forEach((element) => dataComplete.push(element));

    dataComplete.filter(
      (element) => element.TIPO_DOCUMENTO != "Estatus de Registro"
    );
    logger.info("El SP Validaciones diario termino de ejecutarse");

    return dataComplete;
  } catch (error) {
    notificationMailError(
      `El SP Validaciones diario tuvo un error al ejecutarse ${error}`
    );
  }
};

export const execSPLaureate = async () => {
  logger.info("El SP de Luareate se esta ejecutando...");

  try {
    let data = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_TABLEROS_SCORE_GLOBAL]`
    );

    const sortedData = data[0].sort((a, b) => {
      if (a.MARCA < b.MARCA) return -1;
      if (a.MARCA > b.MARCA) return 1;
      return a.RFC.localeCompare(b.RFC);
    });
    
    logger.info("El SP Validaciones diario termino de ejecutarse");

    return sortedData;
  } catch (error) {
    notificationMailError(
      `El SP de LUAREATE tuvo un error al ejecutarse ${error}`
    );
  }
};
