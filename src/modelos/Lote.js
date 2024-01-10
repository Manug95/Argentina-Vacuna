import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Lote extends Model { }

Lote.init({
  nroLote: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreComercial: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  vencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notNull: true
    }
  },
  fechaFabricacion: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notNull: true
    }
  }
}, {
  sequelize,
  modelName: "Lote", //nombre del modelo
  tableName: "Lotes", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { Lote };