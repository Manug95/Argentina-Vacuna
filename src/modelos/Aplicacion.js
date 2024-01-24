import { DataTypes, Model }from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Lote } from "./Lote.js";
import { PersonalSalud } from "./PersonalSalud.js";
import { Paciente } from "./Paciente.js";
import { CentroVacunacion } from "./CentroVacunacion.js";

class Aplicacion extends Model { }

Aplicacion.init({
  enfermero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: PersonalSalud,
      key: "id"
    }
  },
  paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Paciente,
      key: "id"
    }
  },
  lote: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Lote,
      key: "nroLote"
    }
  },
  centroVacunacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: CentroVacunacion,
      key: "id"
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true,
      notNull: true
    }
  }
}, {
  sequelize,
  modelName: "Aplicacion",
  tableName: "Aplicaciones",
  timestamps: false,
  freezeTableName: true
});

export { Aplicacion };