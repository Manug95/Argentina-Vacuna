import { Laboratorio } from "./Laboratorio.js";
import { Country } from "./Country.js";
import { Almacena } from "./Almacena.js";
import { Lote } from "./Lote.js";
import { TipoVacuna } from "./TipoVacuna.js";
import { DepositoNacional } from "./DepositoNacional.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { DistribucionNacional } from "./DistribucionNacional.js";

//Laboratorio-Pais
Country.hasMany(Laboratorio);
Laboratorio.belongsTo(Country);

//Lote-Laboratorio
Laboratorio.hasMany(Lote);

//Lote-TipoVacuna
TipoVacuna.hasMany(Lote);

//Lote-DepositoNacional por table Almacena
Lote.belongsToMany(DepositoNacional, { through: Almacena, foreignKey: "LoteId" });
DepositoNacional.belongsToMany(Lote, { through: Almacena, foreignKey: "DepositoId" });

Lote.belongsToMany(DepositoProvincial, { through: DistribucionNacional, foreignKey: "LoteId"});
DepositoProvincial.belongsToMany(Lote, { through: DistribucionNacional, foreignKey: "LoteId"});
// DepositoNacional.belongsToMany(DistribucionNacional, { through: , foreignKey:"DepNacId" });
// DistribucionNacional.belongsToMany(DepositoNacional, { through: , foreignKey: "DepProvId" });

export {
  Country,
  Laboratorio,
  Lote,
  TipoVacuna,
  DepositoNacional,
  Almacena,
  DepositoProvincial,
  DistribucionNacional
};