import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Localidad extends Model { }

Localidad.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  }
}, {
  sequelize,
  modelName: "Localidad",
  tableName: "Localidades",
  timestamps: false,
  freezeTableName: true
});

export { Localidad };