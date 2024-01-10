import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Almacena extends Model { }

Almacena.init({
  fechaCompra: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true,
      notNull: true
    }
  },
  fechaAdquisicion: {
    type: DataTypes.DATE,
    allowNull: false,
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
      min: 0
    }
  }
}, {
  sequelize,
  modelName: "Almacena", //nombre del modelo
  tableName: "Almacena", //nombre de la tabla
  timestamps: false,
  freezeTableName: true
});

export { Almacena };