import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class DepProv_CenVac_Lote extends Model { }

DepProv_CenVac_Lote.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "DepProv_CenVac_Lote",
  tableName: "DepProv_CenVac_Lote",
  timestamps: false,
  freezeTableName: true
});

export {
  DepProv_CenVac_Lote
}