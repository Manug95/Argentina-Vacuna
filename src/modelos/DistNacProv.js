import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class DistNacProv extends Model { }

DistNacProv.init({

}, {
  sequelize,
  modelName: "DistNacProv", //nombre del modelo
  tableName: "DistNacProv", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export {
  DistNacProv
}