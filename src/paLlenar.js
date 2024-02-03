import { sequelize } from "./config/sequelize.js";
import { Op } from "sequelize";
import * as modelos from "./modelos/relaciones.js";
import pc from "picocolors"

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
  // .catch(err => console.error(pc.red(err)));
  try {
    // await llenarPaises();
    // await llenarProvincias();
    // await llenarLocalidades();
    // await llenarLaboratorios();
    // await llenarTiposVacunas();
    // await llenarLotes();
    // await llenarDepositoNacional();
    // await llenarDepositoProvincial();
    // await llenarCentrosVacunacion();
    // await llenarAlmacen();
    // await llenarDistribucionNacional();
  } catch (err) {
    console.error(pc.red(err));
  }
}

async function llenarPaises() {
  await modelos.Country.bulkCreate([
    { nombre: "USA" },
    { nombre: "Alemania" },
    { nombre: "Japon" },
    { nombre: "Rusia" },
  ]);
}

async function llenarLaboratorios() {
  await modelos.Laboratorio.bulkCreate([
    { nombre: "El Bayern", pais: 2},
    { nombre: "Laboratorio Yankee", pais: 1 },
    { nombre: "Laboratorio Ponja", pais: 3 },
    { nombre: "Laboratorio Ruso", pais: 4 },
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
  await modelos.DepositoNacional.create({
    nombre: "Deposito Nacional A"
  });
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
      nombreComercial: "nombre1",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorio: 1,
      tipoVacuna: 2
    },
    {
      nombreComercial: "nombre2",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorio: 2,
      tipoVacuna: 1
    },
    {
      nombreComercial: "nombre3",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorio: 3,
      tipoVacuna: 2
    },
    {
      nombreComercial: "nombre4",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorio: 1,
      tipoVacuna: 3
    }
  ]);
}

async function llenarAlmacen() {
  await modelos.Almacena.bulkCreate([
    {
      fechaCompra: new Date(2024,1,10),
      fechaAdquisicion: new Date(2024,1,11),
      cantidad: 10000,
      lote: 1,
      deposito: 1
    },
    {
      fechaCompra: new Date(2024,1,15),
      fechaAdquisicion: new Date(2024,1,16),
      cantidad: 5000,
      lote: 2,
      deposito: 1
    },
    {
      fechaCompra: new Date(2024,1,20),
      fechaAdquisicion: new Date(2024,1,23),
      cantidad: 1000,
      lote: 3,
      deposito: 1
    },
    {
      fechaCompra: new Date(2024,1,18),
      fechaAdquisicion: new Date(2024,1,19),
      cantidad: 1000,
      lote: 4,
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