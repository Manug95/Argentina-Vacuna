import { Laboratorio } from "../Laboratorio.js";
import { Pais } from "../Pais.js";

Pais.hasMany(Laboratorio);
Laboratorio.belongsTo(Pais);

export {
  Pais,
  Laboratorio
}

