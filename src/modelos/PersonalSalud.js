import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Persona } from "./Persona.js";

class PersonalSalud extends Model { }

PersonalSalud.init({
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
  cargo: {
    type: DataTypes.ENUM,
    values: ['ENFERMERO', 'ADMINISTRATIVO'],
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 20],
      isIn: [['ENFERMERO', 'ADMINISTRATIVO']]
    }
  },
  licencia: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  }
}, {
  sequelize,
  modelName: "PersonalSalud",
  tableName: "PersonalSalud",
  timestamps: false,
  freezeTableName: true
});

export { PersonalSalud };