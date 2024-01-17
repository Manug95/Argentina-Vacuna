import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class CenVac_Lote extends Model { }

CenVac_Lote.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
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
  modelName: "CenVac_Lote",
  tableName: "CenVac_Lote",
  timestamps: false,
  freezeTableName: true
});

export { CenVac_Lote };