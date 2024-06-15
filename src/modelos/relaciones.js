import { Laboratorio } from "./Laboratorio.js";
import { Country } from "./Country.js";
import { Almacena } from "./Almacena.js";
import { Lote } from "./Lote.js";
import { TipoVacuna } from "./TipoVacuna.js";
import { Vacuna } from "./Vacuna.js";
import { DepositoNacional } from "./DepositoNacional.js";
import { DepositoProvincial } from "./DepositoProvincial.js";
import { DepProv_Lote } from "./DepProv_Lote.js";
import { DepNac_DepProv_Lote } from "./DepNac_DepProv_Lote.js";
import { Provincia } from "./Provincia.js";
import { Localidad } from "./Localidad.js";
import { CentroVacunacion } from "./CentroVacunacion.js";
import { PersonalSalud } from "./PersonalSalud.js";
import { Descarte } from "./Descarte.js";
import { CenVac_Lote } from "./CenVac_Lote.js";
import { DepProv_CenVac_Lote } from "./DepProv_CenVac_Lote.js";
import { DistribucionNacional } from "./DistribucionNacional.js";
import { DistribucionProvincial } from "./DistribucionProvincial.js";

//Laboratorio-Pais
Country.hasMany(Laboratorio, {foreignKey: "pais_id"});
Laboratorio.belongsTo(Country, {foreignKey: "pais_id"});

//Vacuna-Laboratorio
Laboratorio.hasMany(Vacuna, { foreignKey: "laboratorio_id" });
Vacuna.belongsTo(Laboratorio, { foreignKey: "laboratorio_id" });

//Lote-TipoVacuna
TipoVacuna.hasMany(Vacuna, {foreignKey: "tipoVacuna_id"});
Vacuna.belongsTo(TipoVacuna, {foreignKey: "tipoVacuna_id"});

//Localidad-Provincia
// Provincia.hasMany(Localidad, {foreignKey: "provincia"});
// Localidad.belongsTo(Provincia, {foreignKey: "provincia"});

//Lote-Laboratorio
Vacuna.hasMany(Lote, {foreignKey: "vacuna_id"});
Lote.belongsTo(Vacuna, {foreignKey: "vacuna_id"});

//Lote-DepositoNacional por table Almacena
Lote.belongsToMany(DepositoNacional, { through: Almacena, foreignKey: "lote" });
DepositoNacional.belongsToMany(Lote, { through: Almacena, foreignKey: "deposito" });
Lote.hasMany(Almacena, { foreignKey: "lote" });
Almacena.belongsTo(Lote, { foreignKey: "lote" });
DepositoNacional.hasMany(Almacena, { foreignKey: "deposito" });
Almacena.belongsTo(DepositoNacional, { foreignKey: "deposito" });

//relacion super many to many entre Lote-DepositoProvincial-DepositoNacional
// Lote.belongsToMany(DepositoProvincial, { through: DepProv_Lote, sourceKey: "nroLote", targetKey: "id" });
// DepositoProvincial.belongsToMany(Lote, { through: DepProv_Lote, sourceKey: "id", targetKey: "nroLote" });
// DepProv_Lote.belongsTo(Lote);
// DepProv_Lote.belongsTo(DepositoProvincial);
// Lote.hasMany(DepProv_Lote);
// DepositoProvincial.hasMany(DepProv_Lote);
// DepositoNacional.belongsToMany(DepProv_Lote, { through: DepNac_DepProv_Lote, sourceKey: "id", targetKey: "id"});
// DepProv_Lote.belongsToMany(DepositoNacional, { through: DepNac_DepProv_Lote, sourceKey: "id", targetKey: "id" });
// DepNac_DepProv_Lote.belongsTo(DepositoNacional);
// DepNac_DepProv_Lote.belongsTo(DepProv_Lote);
// DepositoNacional.hasMany(DepNac_DepProv_Lote);
// DepProv_Lote.hasMany(DepNac_DepProv_Lote);

//Provincia-DepositoProvincial
// Provincia.hasMany(DepositoProvincial, {foreignKey: "provincia"});
// DepositoProvincial.belongsTo(Provincia, {foreignKey: "provincia"});

// //Localidad-CentroVacunacion
// Localidad.hasMany(CentroVacunacion, {foreignKey: "ciudad"});
// CentroVacunacion.belongsTo(Localidad, {foreignKey: "ciudad"});

//relacion super many to many entre Lote-CentroVacunacion-DepositoProvincial
// Lote.belongsToMany(CentroVacunacion, { through: CenVac_Lote, sourceKey: "nroLote", targetKey: "id" });
// CentroVacunacion.belongsToMany(Lote, { through: CenVac_Lote, sourceKey: "id", targetKey: "nroLote" });
// CenVac_Lote.belongsTo(Lote);
// CenVac_Lote.belongsTo(CentroVacunacion);
// Lote.hasMany(CenVac_Lote);
// CentroVacunacion.hasMany(CenVac_Lote);
// DepositoProvincial.belongsToMany(CenVac_Lote, { through: DepProv_CenVac_Lote, sourceKey: "id", targetKey: "id" });
// CenVac_Lote.belongsToMany(DepositoProvincial, { through: DepProv_CenVac_Lote, sourceKey: "id", targetKey: "id" });
// DepProv_CenVac_Lote.belongsTo(DepositoProvincial);
// DepProv_CenVac_Lote.belongsTo(CenVac_Lote);
// DepositoProvincial.hasMany(DepProv_CenVac_Lote);
// CenVac_Lote.hasMany(DepProv_CenVac_Lote);

// PersonalSalud.hasMany(Descarte);
// Descarte.belongsTo(PersonalSalud);


export {
  Country,
  Laboratorio,
  Lote,
  TipoVacuna,
  Vacuna,
  DepositoNacional,
  Almacena,
  DepositoProvincial,
  DepProv_Lote,
  DepNac_DepProv_Lote,
  Provincia,
  Localidad,
  CentroVacunacion,
  CenVac_Lote,
  DepProv_CenVac_Lote,
  PersonalSalud,
  Descarte,
  DistribucionNacional,
  DistribucionProvincial
};