import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class DepositoNacional extends Model { }

DepositoNacional.init({
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
  modelName: "DepositoNacional", //nombre del modelo
  tableName: "DepositosNacionales", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { DepositoNacional };