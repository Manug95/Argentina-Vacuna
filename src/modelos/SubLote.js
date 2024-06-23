import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class SubLote extends Model { }

SubLote.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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
  modelName: "SubLote",
  tableName: "sub_lote",
  timestamps: false,
  freezeTableName: true
});

export { SubLote };