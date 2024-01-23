import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Persona extends Model { }

Persona.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dni: {
    type: DataTypes.STRING(9),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: [8, 8]
    }
  },
  nombres: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  apellidos: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: [1, 20]
    }
  },
  fechaNac: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notNull: true
    }
  }
}, {
  sequelize,
  modelName: "Persona",
  tableName: "Personas",
  timestamps: false,
  freezeTableName: true
});

export { Persona };