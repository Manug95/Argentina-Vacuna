import { sequelize } from "../src/config/sequelize.js";
import { Op } from "sequelize";
import * as modelos from "../src/modelos/relaciones.js";

export async function llenado() {
  // sequelize.sync()
  // .then(async () => {
  //   await llenarPaises();
  //   await llenarProvincias();
  //   await llenarLocalidades();
  //   await llenarLaboratorios();
  //   await llenarTiposVacunas();
  //   await llenarLotes();
  //   await llenarDepositoNacional();
  //   await llenarDepositoProvincial();
  //   await llenarCentrosVacunacion();
  //   await llenarAlmacen();
  // })
  // .catch(err => console.error(err));
  try {
    // await llenarPaises();

    await llenarProvincias();
    // await llenarLocalidades();

    // await llenarLaboratorios();
    // await llenarTiposVacunas();
    // await llenarVacunas();
    // await llenarLotes();
    // await llenarDepositoNacional();

    await llenarDepositoProvincial();
    // await llenarCentrosVacunacion();
    // await llenarAlmacen();
    // await llenarDistribucionNacional();
  } catch (err) {
    console.error(err);
  }
}

async function llenarPaises() {
  await modelos.Country.bulkCreate([
    { nombre: "USA" },
    { nombre: "Alemania" },
    { nombre: "Japon" },
    { nombre: "Rusia" },
    { nombre: "Inglaterra" }
  ]);
}

async function llenarLaboratorios() {
  await modelos.Laboratorio.bulkCreate([
    { nombre: "El Bayern", pais: 2},
    { nombre: "Laboratorio Yankee", pais: 1 },
    { nombre: "Laboratorio Ponja", pais: 3 },
    { nombre: "Laboratorio Ruso", pais: 4 },
    { nombre: "Laboratorio Ingles", pais: 5 }
  ]);
}

async function llenarTiposVacunas() {
  await modelos.TipoVacuna.bulkCreate([
    { tipo: "BCG" },
    { tipo: "Atitetanica" },
    { tipo: "SABIN" },
    { tipo: "Antisarampionosa" },
    { tipo: "MMR" },
    { tipo: "Triple Viral" }
  ]);
}

async function llenarVacunas() {
  await modelos.Vacuna.bulkCreate([
    { nombreComercial: "BCGarda", tipoVacuna_id: 1, laboratorio_id: 1 },
    { nombreComercial: "AntiTet", tipoVacuna_id: 2, laboratorio_id: 2 },
    { nombreComercial: "SABINarda", tipoVacuna_id: 3, laboratorio_id: 3 },
    { nombreComercial: "Sin Sarampion", tipoVacuna_id: 4, laboratorio_id: 4 },
    { nombreComercial: "MMR pro", tipoVacuna_id: 5, laboratorio_id: 5 },
    { nombreComercial: "Triplarda", tipoVacuna_id: 6, laboratorio_id: 6 },
    { nombreComercial: "BCgita", tipoVacuna_id: 1, laboratorio_id: 2 },
    { nombreComercial: "Sin Tetanos", tipoVacuna_id: 2, laboratorio_id: 3 },
    { nombreComercial: "Chau Sarampion", tipoVacuna_id: 4, laboratorio_id: 3 },
    { nombreComercial: "The Treble", tipoVacuna_id: 6, laboratorio_id: 2 },
  ]);
}

async function llenarProvincias() {
  await modelos.Provincia.bulkCreate([
    { nombre: "Buenos Aires" },
    { nombre: "Santa Fé" },
    { nombre: "Entre Ríos" },
    { nombre: "Corrientes" },
    { nombre: "Misiones" },
    { nombre: "Formosa" },
    { nombre: "Chaco" },
    { nombre: "Santiago del Estero" },
    { nombre: "Tucumán" },
    { nombre: "Córdoba" },
    { nombre: "San Luís" },
    { nombre: "La Pampa" },
    { nombre: "Mendoza" },
    { nombre: "San Juan" },
    { nombre: "La Rioja" },
    { nombre: "Catamarca" },
    { nombre: "Salta" },
    { nombre: "Jujuy" },
    { nombre: "Neuquén" },
    { nombre: "Río Negro" },
    { nombre: "Chubut" },
    { nombre: "Santa Cruz" },
    { nombre: "Tierra del Fuego" },
  ]);
}

async function llenarLocalidades() {
  await modelos.Localidad.bulkCreate([
    { nombre: "localidad 1", provincia: 1 },
    { nombre: "localidad 2", provincia: 2 },
    { nombre: "localidad 3", provincia: 3 },
    { nombre: "localidad 4", provincia: 4 },
    { nombre: "localidad 5", provincia: 5 },
    { nombre: "localidad 6", provincia: 1 },
    { nombre: "localidad 7", provincia: 2 },
    { nombre: "localidad 8", provincia: 3 },
    { nombre: "localidad 9", provincia: 1 },
    { nombre: "localidad 10", provincia: 1 },
    // { nombre: "San Luís" },
    // { nombre: "La Pampa" },
    // { nombre: "Mendoza" },
    // { nombre: "San Juan" },
    // { nombre: "La Rioja" },
    // { nombre: "Catamarca" },
    // { nombre: "Salta" },
    // { nombre: "Jujuy" },
    // { nombre: "Neuquén" },
    // { nombre: "Río Negro" },
    // { nombre: "Chubut" },
    // { nombre: "Santa Cruz" },
    // { nombre: "Tierra del Fuego" },
  ]);
}

async function llenarDepositoNacional() {
  await modelos.DepositoNacional.bulkCreate([
    { nombre: "Deposito Nacional A" },
    { nombre: "Deposito Nacional B" },
    { nombre: "Deposito Nacional C" }
  ]);
}

async function llenarDepositoProvincial() {
  await modelos.DepositoProvincial.bulkCreate([
    { nombre: "Deposito Provincial A", provincia: 1 },
    { nombre: "Deposito Provincial B", provincia: 2 },
    { nombre: "Deposito Provincial C", provincia: 3 }
  ]);
}

async function llenarCentrosVacunacion() {
  await modelos.CentroVacunacion.bulkCreate([
    { nombre: "Centro Vacunacion A", ciudad: 1 },
    { nombre: "Centro Vacunacion B", ciudad: 2 },
    { nombre: "Centro Vacunacion C", ciudad: 3 },
    { nombre: "Centro Vacunacion D", ciudad: 4 },
    { nombre: "Centro Vacunacion E", ciudad: 5 }
  ]);
}

async function llenarLotes() {
  await modelos.Lote.bulkCreate([
    {
      // fechaCompra: new Date(2024,1,10),
      fechaFabricacion: new Date(2023, 0, 2),
      vencimiento: new Date(2025, 0, 2),
      cantidad: 10000,
      vacuna_id: 12
    },
    {
      // fechaCompra: new Date(2024, 1, 15),
      fechaFabricacion: new Date(2023, 0, 2),
      vencimiento: new Date(2025, 0, 2),
      cantidad: 5000,
      vacuna_id: 11
    },
    {
      // fechaCompra: new Date(2024 ,1, 20),
      fechaFabricacion: new Date(2023, 0, 2),
      vencimiento: new Date(2025, 0, 2),
      cantidad: 1000,
      vacuna_id: 15
    },
    {
      // fechaCompra: new Date(2024, 1, 18),
      fechaFabricacion: new Date(2023, 0, 2),
      vencimiento: new Date(2025, 0, 2),
      cantidad: 3500,
      vacuna_id: 14
    },
    {
      // fechaCompra: new Date(2024, 5, 18),
      fechaFabricacion: new Date(2023, 0, 2),
      vencimiento: new Date(2025, 0, 2),
      cantidad: 1000,
      vacuna_id: 13
    }
  ]);
}

async function llenarAlmacen() {
  await modelos.Almacena.bulkCreate([
    {
      lote: 1,
      deposito: 1
    },
    {
      lote: 2,
      deposito: 1
    },
    {
      lote: 3,
      deposito: 1
    },
    {
      lote: 4,
      deposito: 1
    },
    {
      lote: 5,
      deposito: 1
    }
  ]);
}

async function llenarDistribucionNacional() {
  await modelos.DistribucionNacional.bulkCreate([
    {
      depositoNacional: 1,
      depositoProvincial: 3,
      lote: 1,
      fechaSalida: new Date(2024,0,28),
      fechaLlegada: new Date(2024,0,30),
      cantidad: 1000
    },
    {
      depositoNacional: 1,
      depositoProvincial: 1,
      lote: 2,
      fechaSalida: new Date(2024,0,25),
      fechaLlegada: new Date(2024,0,30),
      cantidad: 2000
    },
    {
      depositoNacional: 1,
      depositoProvincial: 2,
      lote: 3,
      fechaSalida: new Date(2024,0,24),
      fechaLlegada: new Date(2024,0,29),
      cantidad: 3000
    },
    {
      depositoNacional: 1,
      depositoProvincial: 3,
      lote: 3,
      fechaSalida: new Date(2024,0,28),
      fechaLlegada: new Date(2024,0,25),
      cantidad: 4000
    },
    {
      depositoNacional: 1,
      depositoProvincial: 1,
      lote: 4,
      fechaSalida: new Date(2024,0,24),
      fechaLlegada: new Date(2024,0,27),
      cantidad: 5000
    }
  ]);
}

async function llenarDistribucionProvincial() {
  await modelos.DistribucionProvincial.bulkCreate([
    
  ]);
}