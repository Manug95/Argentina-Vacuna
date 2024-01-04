import { app } from "./app.js";
import { sequelize } from "./config/sequelize.js";
import { Laboratorio, Pais } from "./modelos/relaciones/Laboratorio-Pais.js";

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
  await Laboratorio.sync();
  await Pais.sync();
}