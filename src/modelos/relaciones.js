import { Laboratorio } from "./Laboratorio.js";
import { Country } from "./Country.js";
import { Lote } from "./Lote.js";
import { TipoVacuna } from "./TipoVacuna.js";

//Laboratorio-Pais
Country.hasMany(Laboratorio);
Laboratorio.belongsTo(Country);

//Lote-Laboratorio
Laboratorio.hasMany(Lote);

//Lote-TipoVacuna
TipoVacuna.hasMany(Lote);

export {
  Country,
  Laboratorio,
  Lote,
  TipoVacuna
};