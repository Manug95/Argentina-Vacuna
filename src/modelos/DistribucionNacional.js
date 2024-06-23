import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { DepositoNacional } from "./DepositoNacional.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { Lote } from "./Lote.js";

class DistribucionNacional extends Model { }

DistribucionNacional.init({
  fechaSalida: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      // isBefore: new Date().toLocaleDateString(),
      notNull: true
    }
  },
  fechaLlegada: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      // isBefore: new Date().toLocaleDateString(),
      notNull: true
    }
  },
  // cantidad: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     isNumeric: true,
  //     isInt: true,
  //     notNull: true,
  //     min: 1
  //   }
  // }
}, {
  sequelize,
  modelName: "DistribucionNacional",
  tableName: "distribucion_nacional",
  timestamps: false,
  freezeTableName: true
});

export { DistribucionNacional };