import { sequelize } from "../database/connection.js";

export const execSP = async (reportSelect) => {
  const data = await sequelize.query(
    `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = ${reportSelect.id}`
  );
  
  return data
};
