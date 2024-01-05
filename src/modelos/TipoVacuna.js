import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class TipoVacuna extends Model { }

TipoVacuna.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  modelName: "TipoVacuna", //nombre del modelo
  tableName: "TiposVacunas", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { TipoVacuna };