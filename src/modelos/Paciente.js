import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Persona } from "./Persona.js";

class Paciente extends Model { }

Paciente.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  persona: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona,
      key: "id"
    }
  },
  genero: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 10]
    }
  }
}, {
  sequelize,
  modelName: "Paciente",
  tableName: "Pacientes",
  timestamps: false,
  freezeTableName: true
});

export { Paciente };