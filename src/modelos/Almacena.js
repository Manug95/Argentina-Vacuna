import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Lote } from "./Lote.js";
import { DepositoNacional } from "./DepositoNacional.js";

class Almacena extends Model { }

Almacena.init({
  // idLote: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Lote,
  //     key: 'nroLote',
  //   },
  // },
  // idDeposito: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: DepositoNacional,
  //     key: 'id',
  //   },
  // },
  fechaCompra: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true,
      notNull: true
    }
  },
  // fechaAdquisicion: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   validate: {
  //     isDate: true,
  //     notNull: true
  //   }
  // },
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
  modelName: "Almacena",
  tableName: "almacena",
  timestamps: true,
  createdAt: "fecha_adquisicion",
  updatedAt: true,
  freezeTableName: true,
  // unique: false
});

export { Almacena };