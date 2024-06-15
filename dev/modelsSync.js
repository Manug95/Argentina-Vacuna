import pc from "picocolors";

// import { DepNac_DepProv_Lote } from "../src/modelos/DepNac_DepProv_Lote.js";
// import { DepProv_Lote } from "../src/modelos/DepProv_Lote.js";
// import { DepProv_CenVac_Lote } from "../src/modelos/DepProv_CenVac_Lote.js";
import { DistribucionNacional } from "../src/modelos/DistribucionNacional.js";
import { DistribucionProvincial } from "../src/modelos/DistribucionProvincial.js";
import { CenVac_Lote } from "../src/modelos/CenVac_Lote.js";
import { Almacena } from "../src/modelos/Almacena.js";
import { Country } from "../src/modelos/Country.js";
import { DepositoNacional } from "../src/modelos/DepositoNacional.js";
import { DepositoProvincial } from "../src/modelos/DepositoProvincial.js";
import { Laboratorio } from "../src/modelos/Laboratorio.js";
import { Lote } from "../src/modelos/Lote.js";
import { TipoVacuna } from "../src/modelos/TipoVacuna.js";
import { Vacuna } from "../src/modelos/Vacuna.js";
import { Provincia } from "../src/modelos/Provincia.js";
import { Localidad } from "../src/modelos/Localidad.js";
import { CentroVacunacion } from "../src/modelos/CentroVacunacion.js";
import { Redistribucion } from "../src/modelos/Redistribucion.js";
import { Persona } from "../src/modelos/Persona.js";
import { PersonalSalud } from "../src/modelos/PersonalSalud.js";
import { Paciente } from "../src/modelos/Paciente.js";
import { Aplicacion } from "../src/modelos/Aplicacion.js";
import { Descarte } from "../src/modelos/relaciones.js";
import * as modelos from "../src/modelos/relaciones.js";

export async function pruebaBD() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} 

export async function pruebaSync() {  //primero sincronizo los modelos y despues los modifico con las relaciones
  try {
  await Country.sync()
  // await Provincia.sync();
  // await Localidad.sync();
  await Laboratorio.sync();
  await TipoVacuna.sync();
  await Vacuna.sync();
  await Lote.sync();
  await DepositoNacional.sync();
  // await DepositoProvincial.sync();
  await Almacena.sync();
  // await CentroVacunacion.sync();
  // await Persona.sync({alter:true});
  // await PersonalSalud.sync({alter:true});
  // await Paciente.sync({alter:true});
  // await Descarte.sync({alter: true});
  // await DistribucionNacional.sync();
  // await DistribucionProvincial.sync();

  await modelos.Country.sync({alter:true});
  // await modelos.Provincia.sync({alter:true});
  // await modelos.Localidad.sync({alter: true});
  await modelos.Laboratorio.sync({alter:true});
  await modelos.TipoVacuna.sync({alter:true});
  await modelos.Vacuna.sync({alter:true});
  // await modelos.DepositoProvincial.sync({alter:true});
  await modelos.Lote.sync({alter:true});
  await modelos.DepositoNacional.sync({alter:true});
  await modelos.Almacena.sync({alter:true});
  // await Redistribucion.sync({alter:true});  //Esta clase esta hecha con el atributo references en lugar de las relaciones
  // await Aplicacion.sync({alter:true});  //Esta clase esta hecha con el atributo references en lugar de las relaciones
  } catch(err) {
    console.error(pc.red(err.parent.sqlMessage));
    console.log(pc.green(err.parent.sql));
    // console.error(pc.red(err));
  }
}