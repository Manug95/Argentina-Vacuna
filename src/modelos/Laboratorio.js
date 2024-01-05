import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Laboratorio extends Model { }

Laboratorio.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  }
}, {
  sequelize,
  modelName: "Laboratorio", //nombre del modelo
  tableName: "Laboratorios", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { Laboratorio };