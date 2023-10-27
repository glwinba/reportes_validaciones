import config from "../config.js";
import { Sequelize } from "sequelize";


const sequelize = new Sequelize(
    config.DB_NAME_SCHEMA,
    config.DB_NAME_USER,
    config.DB_PASSWORD, 
    {
        host: config.DB_SERVER,
        port: config.DB_PORT,
        dialect: "mssql",
        timezone: "America/Mexico_City",
        define: {
            schema: "BM_SERV_ESP", // Esquema de la base de datos.
            freezeTableName: true // Tablas en singular
        },
        dialectOptions: {
            options: { requestTimeout: 1200000 }
          },
          
        logging: false
    }
)

export default sequelize
