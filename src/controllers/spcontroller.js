import { sequelize } from "../database/connection.js";

export const execSP = async () => {
  const data = await sequelize.query(
    "EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = 2"
  );
  console.log(data)
};
