import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Lote extends Model { }

Lote.init({
  nroLote: {
    type:  DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
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
  },
  fechaCompra: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true,
      notNull: true
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      notNull: true,
      min: 1
    }
  }
}, {
  sequelize,
  modelName: "Lote",
  tableName: "lotes",
  timestamps: false,
  freezeTableName: true
});

export { Lote };