import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { PersonalSalud } from "./PersonalSalud.js";
import { Lote } from "./Lote.js";

class Descarte extends Model { }

Descarte.init({
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  personal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: PersonalSalud,
      key: "id"
    }
  },
  lote: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Lote,
      key: "nroLote"
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true,
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
  },
  motivo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1,100]
    }
  },
  formaDescarte: {
    type: DataTypes.ENUM(),
    values: ["VENCIDA", "EMPAQUE DAÑADO", "PERDIDA DE FRIO"],
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 20],
      isIn: [["VENCIDA", "EMPAQUE DAÑADO", "PERDIDA DE FRIO"]]
    }
  }
}, {
  sequelize,
  modelName: "Descarte",
  tableName: "Descartes",
  timestamps: false,
  freezeTableName: true
});

export { Descarte };