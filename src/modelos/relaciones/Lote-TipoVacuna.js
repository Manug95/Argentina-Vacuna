import { Lote } from "../Lote.js";
import { TipoVacuna } from "../TipoVacuna.js";

TipoVacuna.hasMany(Lote);

export {
  Lote,
  TipoVacuna
};