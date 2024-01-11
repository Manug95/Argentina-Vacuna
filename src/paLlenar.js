import { sequelize } from "./config/sequelize.js";
import * as modelos from "./modelos/relaciones.js";

export async function llenado() {
  sequelize.sync()
  .then(async () => {
    // llenarPaises();
    // llenarLaboratorios();
    // llenarTiposVacunas();
    // llenarLotes();
    // await llenarDepositoNacional();
    llenarAlmacen();
  })
  .catch(err => console.error(pc.red(err)));
}

function llenarPaises() {
  modelos.Country.bulkCreate([
    {
      nombre: "USA"
    },
    {
      nombre: "Alemania"
    },
    {
      nombre: "Japon"
    },
    {
      nombre: "Rusia"
    },
  ]);
}

function llenarLaboratorios() {
  modelos.Laboratorio.bulkCreate([
    {
      nombre: "El Bayern"
    },
    {
      nombre: "Laboratorio Yankee"
    },
    {
      nombre: "Laboratorio Ponja"
    },
    {
      nombre: "Laboratorio Ruso"
    },
  ]);
}

function llenarTiposVacunas() {
  modelos.TipoVacuna.bulkCreate([
    {
      tipo: "BCG"
    },
    {
      tipo: "Atitetanica"
    },
    {
      tipo: "SABIN"
    },
    {
      tipo: "Antisarampionosa"
    },
    {
      tipo: "MMR"
    },
    {
      tipo: "Triple Viral"
    }
  ]);
}

function llenarLotes() {
  modelos.Lote.bulkCreate([
    {
      nombreComercial: "nombre1",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorioId: 1,
      tipoVacuna: 2
    },
    {
      nombreComercial: "nombre2",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorioId: 2,
      tipoVacuna: 1
    },
    {
      nombreComercial: "nombre3",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorioId: 3,
      tipoVacuna: 2
    },
    {
      nombreComercial: "nombre4",
      vencimiento: new Date(2025,5,15),
      fechaFabricacion: new Date(2023, 0, 2),
      laboratorioId: 1,
      tipoVacuna: 3
    }
  ]);
}

async function llenarDepositoNacional() {
  await modelos.DepositoNacional.create({
    nombre: "Deposito Nacional A"
  });
}

function llenarAlmacen() {
  modelos.Almacena.bulkCreate([
    {
      fechaCompra: new Date(2024,1,10),
      fechaAdquisicion: new Date(2024,1,11),
      cantidad: 10000,
      LoteId: 1,
      DepositoId: 1
    },
    {
      fechaCompra: new Date(2024,1,10),
      fechaAdquisicion: new Date(2024,1,11),
      cantidad: 5000,
      LoteId: 2,
      DepositoId: 1
    },
    {
      fechaCompra: new Date(2024,1,10),
      fechaAdquisicion: new Date(2024,1,11),
      cantidad: 1000,
      LoteId: 3,
      DepositoId: 1
    }
  ]);
}