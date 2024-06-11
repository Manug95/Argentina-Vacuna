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
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  }
}, {
  sequelize,
  modelName: "TipoVacuna",
  tableName: "tipos_vacunas",
  timestamps: false,
  freezeTableName: true
});

export { TipoVacuna };