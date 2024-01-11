import { app } from "./app.js";
import { sequelize } from "./config/sequelize.js";
import pc from "picocolors";
import { llenado } from "./paLlenar.js";

// import { NacProvLote } from "./modelos/NacProvLote.js";
// import { Almacena } from "./modelos/Almacena.js";
// import { Country } from "./modelos/Country.js";
// import { DepositoNacional } from "./modelos/DepositoNacional.js";
// import { DepositoProvincial } from "./modelos/DepositoProvincial.js";
// import { DistribucionNacional } from "./modelos/DistribucionNacional.js";
// import { Laboratorio } from "./modelos/Laboratorio.js";
// import { Lote } from "./modelos/Lote.js";
// import { TipoVacuna } from "./modelos/TipoVacuna.js";
// import { DistNacProv } from "./modelos/DistNacProv.js";
// import { Provincia } from "./modelos/Provincia.js";
import * as modelos from "./modelos/relaciones.js";


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);

  pruebaSync();

  // llenado();

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
  // await Country.sync({alter:true});
  // await Laboratorio.sync({alter:true});
  // await TipoVacuna.sync({alter:true});
  // await DepositoNacional.sync({alter:true});
  // await Lote.sync({alter:true});
  // await DepositoProvincial.sync({alter:true});
  // await Almacena.sync({alter:true});
  // await Provincia.sync({alter:true});

  // await modelos.Country.sync({alter:true});
  await modelos.Provincia.sync({alter:true});
  // await modelos.Laboratorio.sync({alter:true});
  // await modelos.TipoVacuna.sync({alter:true});
  await modelos.DepositoProvincial.sync({alter:true});
  // await modelos.Lote.sync({alter:true});
  // await modelos.DepositoNacional.sync({alter:true});
  // await modelos.Almacena.sync({alter:true});
  // await modelos.DistribucionNacional.sync({alter:true});
  // await modelos.DistNacProv.sync({alter:true});

  // await NacProvLote.sync({alter:true});  //Esta clase esta hecha con el atributo references en lugar de las relaciones
  } catch(err) {
    console.error(pc.red(err.parent.sqlMessage));
    console.log(pc.green(err.parent.sql));
  }
}