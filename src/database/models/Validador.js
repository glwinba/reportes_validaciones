import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Validador = sequelize.define("Validadores", {
    Nombre: {
        type: DataTypes.STRING
    },
    Apellidos: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING
    }
});

export default Validador