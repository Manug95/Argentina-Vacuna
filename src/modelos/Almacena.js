import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Lote } from "./Lote.js";
import { DepositoNacional } from "./DepositoNacional.js";

class Almacena extends Model { }

Almacena.init({
  fechaAdquisicion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_adquisicion',
  }
}, {
  sequelize,
  modelName: "Almacena",
  tableName: "almacena",
  timestamps: true,
  createdAt: false,
  updatedAt: true,
  freezeTableName: true,
  // unique: false
});

export { Almacena };