import { Laboratorio } from "../Laboratorio.js";
import { Pais } from "../Pais.js";

Pais.hasMany(Laboratorio, {
  foreignKey: 'paisId'
});
Laboratorio.belongsTo(Pais);

export {
  Pais,
  Laboratorio
}

