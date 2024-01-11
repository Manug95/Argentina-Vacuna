import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { CentroVacunacion } from "./CentroVacunacion.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { Lote } from "./Lote.js";

class CentroVacLoteDepProv extends Model { }

CentroVacLoteDepProv.init({
  CentroVacId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: CentroVacunacion,
      key: "id"
    }
  },
  DepProvId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: DepositoProvincial,
      key: "id"
    }
  },
  LoteId: {
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
      min: 0
    }
  }
}, {
  sequelize,
  modelName: "CentroVacLoteDepProv",
  tableName: "CentroVacLoteDepProv",
  timestamps: false,
  freezeTableName: true
});

export { CentroVacLoteDepProv };