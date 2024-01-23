import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { CentroVacunacion } from "./CentroVacunacion.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { Lote } from "./Lote.js";

class DistribucionProvincial extends Model { }

DistribucionProvincial.init({
  CentroVacunacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: CentroVacunacion,
      key: "id"
    }
  },
  DepositoProvincial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: DepositoProvincial,
      key: "id"
    }
  },
  Lote: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Lote,
      key: "nroLote"
    }
  },
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
  modelName: "DistribucionProvincial",
  tableName: "DistribucionProvincial",
  timestamps: false,
  freezeTableName: true
});

export { DistribucionProvincial };