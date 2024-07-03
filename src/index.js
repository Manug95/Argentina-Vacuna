import { app } from "./app.js";
import { sequelize } from "./config/sequelize.js";
import { llenado } from "../dev/paLlenar.js";
import { pruebaSync } from "../dev/modelsSync.js";


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);

  // pruebaSync()
  // .then(() => {

  //   sequelize.query('ALTER TABLE vacunas ADD CONSTRAINT vacuna_unica UNIQUE (nombreComercial, laboratorio_id, tipoVacuna_id);')
  //   .then(() => {

  //     llenado()
  //     .then(() => { console.log(pc.green("OPERACION FINALIZADA")) })
  //     .catch((e) => { 
  //       console.log(pc.red("ERROR AL REALIZAR LAS INSERCIONES"));
  //       console.error(e);
  //     });

  //   })
  //   .catch((e) => { 
  //     console.log(pc.red("ERROR AL REALIZAR LAS RESTRICCIONES EN LA TABLA VACUNA"));
  //     console.error(e);
  //    });

  // })
  // .catch((e) => { 
  //   console.log(pc.red("ERROR AL SINCRONIZAR"));
  //   console.error(e);
  //  });

  // sequelize.query('ALTER TABLE vacunas ADD CONSTRAINT vacuna_unica UNIQUE (nombreComercial, laboratorio_id, tipoVacuna_id);')
  // .then(()=>{})
  // .catch(()=>{});


});
