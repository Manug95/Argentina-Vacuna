import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class DistribucionNacional extends Model { }

DistribucionNacional.init({
  fechaSalida: {
    type: DataTypes.DATE,
    allowNull: false,
    // defaultValue: DataTypes.NOW,
    validate: {
      isDate: true,
      notNull: true
    }
  },
  fechaLlegada: {
    type: DataTypes.DATE,
    allowNull: false,
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
      min: 0
    }
  }
}, {
  sequelize,
  modelName: "DistribucionNacional", //nombre del modelo
  tableName: "DistribucionNacional", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { DistribucionNacional };