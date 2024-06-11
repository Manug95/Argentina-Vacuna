import { app } from "./app.js";
import { sequelize } from "./config/sequelize.js";
import pc from "picocolors";
import { llenado } from "../dev/paLlenar.js";
import { pruebaSync } from "../dev/modelsSync.js";


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);

  // pruebaSync();

  // llenado();

});
