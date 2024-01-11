import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { DepositoNacional } from "./DepositoNacional.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { Lote } from "./Lote.js";

class NacProvLote extends Model { }

NacProvLote.init({
  DepNacId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: DepositoNacional,
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
  modelName: "NacProvLote", //nombre del modelo
  tableName: "NacProvLote", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { NacProvLote};