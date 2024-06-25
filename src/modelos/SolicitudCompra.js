import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class SolicitudCompra extends Model { }

SolicitudCompra.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  },
  fechaSolicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    validate: {
      isDate: true,
      notNull: true
    }
  },
  estado: {
    type: DataTypes.ENUM,
    values: ['COMPRADA', 'PENDIENTE'],
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isUppercase: true,
      isIn: [['COMPRADA', 'PENDIENTE']]
    }
  }
}, {
  sequelize,
  modelName: "SolicitudCompra",
  tableName: "solicitud_compra",
  timestamps: false,
  freezeTableName: true
});

export { SolicitudCompra };