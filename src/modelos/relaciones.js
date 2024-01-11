import { Laboratorio } from "./Laboratorio.js";
import { Country } from "./Country.js";
import { Almacena } from "./Almacena.js";
import { Lote } from "./Lote.js";
import { TipoVacuna } from "./TipoVacuna.js";
import { DepositoNacional } from "./DepositoNacional.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { DistribucionNacional } from "./DistribucionNacional.js";
import { DistNacProv } from "./DistNacProv.js";
import { Provincia } from "./Provincia.js";
import { Localidad } from "./Localidad.js";
import { CentroVacunacion } from "./CentroVacunacion.js";

//Laboratorio-Pais
Country.hasMany(Laboratorio);
Laboratorio.belongsTo(Country);

//Localidad-Provincia
Provincia.hasMany(Localidad);
Localidad.belongsTo(Provincia);

//Lote-Laboratorio
Laboratorio.hasMany(Lote);
Lote.belongsTo(Laboratorio);

//Lote-TipoVacuna
TipoVacuna.hasMany(Lote);
Lote.belongsTo(TipoVacuna);

//Lote-DepositoNacional por table Almacena
Lote.belongsToMany(DepositoNacional, { through: Almacena, foreignKey: "LoteId" });
DepositoNacional.belongsToMany(Lote, { through: Almacena, foreignKey: "DepositoId" });

Lote.belongsToMany(DepositoProvincial, { through: DistribucionNacional, foreignKey: "LoteId"});
DepositoProvincial.belongsToMany(Lote, { through: DistribucionNacional, foreignKey: "DepNacId"});
Lote.hasMany(DepositoProvincial);
DepositoProvincial.belongsTo(Lote);
DepositoProvincial.hasMany(Lote);
Lote.belongsTo(DepositoProvincial);
DepositoNacional.belongsToMany(DistribucionNacional, { through: DistNacProv, foreignKey:"DepNacId" });
DistribucionNacional.belongsToMany(DepositoNacional, { through: DistNacProv, foreignKey: "DistNacId" });
DepositoNacional.hasMany(DistribucionNacional);
DistribucionNacional.belongsTo(DepositoNacional);
DistribucionNacional.hasMany(DepositoNacional);
DepositoNacional.belongsTo(DistribucionNacional);

//Provincia-DepositoProvincial
Provincia.hasMany(DepositoProvincial);
DepositoProvincial.belongsTo(Provincia);

Localidad.hasMany(CentroVacunacion);
CentroVacunacion.belongsTo(Localidad);

export {
  Country,
  Laboratorio,
  Lote,
  TipoVacuna,
  DepositoNacional,
  Almacena,
  DepositoProvincial,
  DistribucionNacional,
  DistNacProv,
  Provincia
};