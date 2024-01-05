import { Lote } from "./Lote-TipoVacuna.js";
import { Laboratorio } from "./Laboratorio-Pais.js";

Laboratorio.hasMany(Lote);

export {
  Laboratorio,
  Lote
};