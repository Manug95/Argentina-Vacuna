import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Pais extends Model { }

Pais.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "Pais", //nombre del modelo
  tableName: "Paises", //nombre de la tabla
  timestamps: false
});

export { Pais };