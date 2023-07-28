import logger from "../configs/logger.js";
import { sequelize } from "../database/connection.js";
import { notificationMailError } from "./notificationcontroller.js";

export const execSP = async (reportSelect) => {
  logger.info("El SP se esta ejecutando");
  try {
    let data = await sequelize.query(
      `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = ${reportSelect.id}`
    );
    if (reportSelect.id === 2) {
      data[0] = data[0].filter(
        (element) => element.RFC_EMPRESA != "FAR970429SE2"
      );
    }

    data[0].forEach((element) => {
      if (
        element.Score === "100.00 %" &&
        (element.ESTATUS === 1 || element.ESTATUS === 3)
      ) {
        element.ESTATUS = 4;
      }
    });
    logger.info("El SP termino de ejecutarse");
    return data;
  } catch (error) {
    notificationMailError(`El SP tuvo un error al ejecutarse ${error}`);
  }
};
