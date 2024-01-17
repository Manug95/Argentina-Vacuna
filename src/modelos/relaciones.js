import { Laboratorio } from "./Laboratorio.js";
import { Country } from "./Country.js";
import { Almacena } from "./Almacena.js";
import { Lote } from "./Lote.js";
import { TipoVacuna } from "./TipoVacuna.js";
import { DepositoNacional } from "./DepositoNacional.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { DepProv_Lote } from "./DepProv_Lote.js";
import { DepNac_DepProv_Lote } from "./DepNac_DepProv_Lote.js";
import { Provincia } from "./Provincia.js";
import { Localidad } from "./Localidad.js";
import { CentroVacunacion } from "./CentroVacunacion.js";
import { PersonalSalud } from "./PersonalSalud.js";
import { Descarte } from "./Descarte.js";

//Laboratorio-Pais
Country.hasMany(Laboratorio);
Laboratorio.belongsTo(Country);

//Localidad-Provincia
Provincia.hasMany(Localidad, {foreignKey: "ProvinciaId"});
Localidad.belongsTo(Provincia, {foreignKey: "ProvinciaId"});

//Lote-Laboratorio
Laboratorio.hasMany(Lote);
Lote.belongsTo(Laboratorio);

//Lote-TipoVacuna
TipoVacuna.hasMany(Lote);
Lote.belongsTo(TipoVacuna);

//Lote-DepositoNacional por table Almacena
Lote.belongsToMany(DepositoNacional, { through: Almacena, foreignKey: "LoteId" });
DepositoNacional.belongsToMany(Lote, { through: Almacena, foreignKey: "DepositoId" });

Lote.belongsToMany(DepositoProvincial, { through: DepProv_Lote, sourceKey: "nroLote", targetKey: "id" });
DepositoProvincial.belongsToMany(Lote, { through: DepProv_Lote, sourceKey: "id", targetKey: "nroLote" });
DepProv_Lote.belongsTo(Lote);
DepProv_Lote.belongsTo(DepositoProvincial);
Lote.hasMany(DepProv_Lote);
DepositoProvincial.hasMany(DepProv_Lote);
DepositoNacional.belongsToMany(DepProv_Lote, { through: DepNac_DepProv_Lote, sourceKey: "id", targetKey: "id"});
DepProv_Lote.belongsToMany(DepositoNacional, { through: DepNac_DepProv_Lote, sourceKey: "id", targetKey: "id" });
DepNac_DepProv_Lote.belongsTo(DepositoNacional);
DepNac_DepProv_Lote.belongsTo(DepProv_Lote);
DepositoNacional.hasMany(DepNac_DepProv_Lote);
DepProv_Lote.hasMany(DepNac_DepProv_Lote);

//Provincia-DepositoProvincial
Provincia.hasMany(DepositoProvincial, {foreignKey: "ProvinciaId"});
DepositoProvincial.belongsTo(Provincia, {foreignKey: "ProvinciaId"});

//Localidad-CentroVacunacion
Localidad.hasMany(CentroVacunacion);
CentroVacunacion.belongsTo(Localidad);

PersonalSalud.hasMany(Descarte);
Descarte.belongsTo(PersonalSalud);


export {
  Country,
  Laboratorio,
  Lote,
  TipoVacuna,
  DepositoNacional,
  Almacena,
  DepositoProvincial,
  DepProv_Lote,
  DepNac_DepProv_Lote,
  Provincia,
  Localidad,
  CentroVacunacion,
  PersonalSalud,
  Descarte
};