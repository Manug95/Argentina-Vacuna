import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class DepNac_DepProv_Lote extends Model { }

DepNac_DepProv_Lote.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "DepNac_DepProv_Lote",
  tableName: "DepNac_DepProv_Lote",
  timestamps: false,
  freezeTableName: true
});

export {
  DepNac_DepProv_Lote
}