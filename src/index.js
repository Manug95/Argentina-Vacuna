import { app } from "./app.js";
import { sequelize } from "./config/sequelize.js";
// import { Laboratorio, Pais } from "./modelos/relaciones/Laboratorio-Pais.js";
// import { Lote, TipoVacuna } from "./modelos/relaciones/Lote-TipoVacuna.js";
import { Lote, Laboratorio } from "./modelos/relaciones/Lote-Laboratorio.js";

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);

  pruebaSync();
});

async function pruebaBD() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} 

async function pruebaSync() {
  await Laboratorio.sync({alter: true});
  await Lote.sync({alter: true});
}