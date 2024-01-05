import { Laboratorio } from "../Laboratorio.js";
import { Country } from "../Country.js";

Country.hasMany(Laboratorio);
Laboratorio.belongsTo(Country);

export {
  Country,
  Laboratorio
}

