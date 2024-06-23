import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class DepositoProvincial extends Model { }

DepositoProvincial.init({
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
  modelName: "DepositoProvincial",
  tableName: "depositos_provinciales",
  timestamps: false,
  freezeTableName: true
});

export { DepositoProvincial };