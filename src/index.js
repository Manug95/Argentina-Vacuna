import { app } from "./app.js";
import { sequelize } from "./config/sequelize.js";
import pc from "picocolors";
import { llenado } from "./paLlenar.js";

// import { DepNac_DepProv_Lote } from "./modelos/DepNac_DepProv_Lote.js";
// import { DepProv_Lote } from "./modelos/DepProv_Lote.js";
// import { DepProv_CenVac_Lote } from "./modelos/DepProv_CenVac_Lote.js";
import { DistribucionNacional } from "./modelos/DistribucionNacional.js";
import { DistribucionProvincial } from "./modelos/DistribucionProvincial.js";
import { CenVac_Lote } from "./modelos/CenVac_Lote.js";
import { Almacena } from "./modelos/Almacena.js";
import { Country } from "./modelos/Country.js";
import { DepositoNacional } from "./modelos/DepositoNacional.js";
import { DepositoProvincial } from "./modelos/DepositoProvincial.js";
import { Laboratorio } from "./modelos/Laboratorio.js";
import { Lote } from "./modelos/Lote.js";
import { TipoVacuna } from "./modelos/TipoVacuna.js";
import { Provincia } from "./modelos/Provincia.js";
import { Localidad } from "./modelos/Localidad.js";
import { CentroVacunacion } from "./modelos/CentroVacunacion.js";
import { Redistribucion } from "./modelos/Redistribucion.js";
import { Persona } from "./modelos/Persona.js";
import { PersonalSalud } from "./modelos/PersonalSalud.js";
import { Paciente } from "./modelos/Paciente.js";
import { Aplicacion } from "./modelos/Aplicacion.js";
import { Descarte } from "./modelos/relaciones.js";
import * as modelos from "./modelos/relaciones.js";


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);

  // pruebaSync();

  llenado();

});

async function pruebaBD() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} 

async function pruebaSync() {  //primero sincronizo los modelos y despues los modifico con las relaciones
  try {
  // await Country.sync()
  // await Provincia.sync()
  // await Localidad.sync()
  // await Laboratorio.sync()
  // await TipoVacuna.sync()
  // await DepositoNacional.sync()
  // await Lote.sync()
  // await DepositoProvincial.sync()
  // await Almacena.sync()
  // await CentroVacunacion.sync();
  // await Persona.sync({alter:true});
  // await PersonalSalud.sync({alter:true});
  // await Paciente.sync({alter:true});
  // await Descarte.sync({alter: true});
  // await DistribucionNacional.sync();
  // await DistribucionProvincial.sync();

  // await modelos.Country.sync({alter:true});
  // await modelos.Provincia.sync({alter:true});
  // await modelos.Localidad.sync({alter: true});
  // await modelos.Laboratorio.sync({alter:true});
  // await modelos.TipoVacuna.sync({alter:true});
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