import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Country extends Model { }

Country.init({
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
  modelName: "Country",
  tableName: "countries",
  timestamps: false,
  freezeTableName: true
});

export { Country };