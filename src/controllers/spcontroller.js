import { sequelize } from "../database/connection.js";

export const execSP = async (reportSelect) => {
  console.log("El SP se esta ejecutando");
  const data = await sequelize.query(
    `EXEC [BM_SERV_ESP].[SP_REPORTES_DIARIOS] @OPCION = ${reportSelect.id}`
  );
  console.log("El SP termino de ejecutarse")
  
  return data
};
