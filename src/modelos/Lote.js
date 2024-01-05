import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Lote extends Model { }

Lote.init({
  nroLote: {
    type: DataTypes.INTEGER,
    // primaryKey: true,
    // autoIncrement: true
  },
  nombreComercial: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vencimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFabricacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaCompra: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaAdquisicion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Lote", //nombre del modelo
  tableName: "Lotes", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { Lote };