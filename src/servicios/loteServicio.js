import { randomUUID } from "node:crypto";
import { Op } from "sequelize";
import {
  SubLote, 
  DistribucionNacional, 
  SolicitudCompra,
  TipoVacuna,
  Lote,
  Vacuna,
  Laboratorio,
  Almacena
} from "../modelos/relaciones.js";
import { 
  GuardarSolicitudError,
  CrearSubLoteError
} from "../modelos/Errores/stockErrors.js";
import Utils from "./Utils.js";

let instanciaServicio;

class LoteServicio {
  constructor() {
    if (instanciaServicio) {
      throw new Error("Solo se puede crear una instancia!");
    }
    instanciaServicio = this;
  }

  async findAndCountAllSolicitudCompra(queryParams) {
    try {
      const { count, rows } = (await SolicitudCompra.findAndCountAll(this.#crearOpcionesDeListado(queryParams)));
  
      const solicitudes = rows
      .map(s => s.toJSON())
      .map(s => {
        s.fechaSolicitud = Utils.formatearFecha(s.fechaSolicitud);
        return s;
      });
  
      return { solicitudes, count };
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener las solicitudes de compra");
    }
  }

  async traerLotesDeLasVacunasRequeridas({ cantidad, tipoVacuna }) {
    try {
      // conseguir los lotes de las vacunas requeridas
      const lote = await Lote.findOne({
        attributes: ["nroLote", "vacuna_id", "cantidad"],
        where: {
          [Op.and]: [
            {
              cantidad: {
                [Op.gte]: cantidad
              }
            },
            {
              vencimiento: {
                [Op.gt]: new Date()
              }
            }
          ]
        },
        include: [
          {
            model: Vacuna,
            attributes: ["id", "tipoVacuna_id"],
            required: true,
            where: {
              TipoVacuna_id: {
                [Op.eq]: tipoVacuna
              }
            }
          }
        ]
      });
      
      return lote;
    } catch (e) {
      console.error(e);
      throw new Error("Error al traer los lotes de las vacunas requeridas");
    }
  }

  async guardarSolicitudDeVacuna({ cantidad, tipoVacuna }) {
    try {
      const solicitud = {
        cantidad: cantidad,
        estado: "PENDIENTE",
        vacuna_id: tipoVacuna
      }
    
      await SolicitudCompra.create(solicitud);
    } catch (e) {
      console.error(e);
      throw new GuardarSolicitudError("No hay stock de la vacuna solicita. No se pudo agregar a la lista de compras pendientes");
    }
  }

  async crearNuevoSubLote({ nroLote }, { cantidad }, transaction) {
    try {
      const id = randomUUID();
      
      const nuevoSubLote = await SubLote.create({
        id,
        lote: nroLote,
        cantidad: cantidad
      },
      {
        transaction: transaction
      });
  
      return nuevoSubLote;
    } catch (e) {
      console.error(e);
      throw new CrearSubLoteError("Error al crear el sub lote");
    }
  }

  async crearDistribucionNacional({ id }, { depositoProv }, transaction) {
    try {
      const subLoteDistribuido = await DistribucionNacional.create({
        deposito: depositoProv,
        sublote: id,
        fechaSalida: new Date(),
        fechaLlegada: new Date()
      },
      {
        transaction: transaction
      });
    
      // return subLoteDistribuido;
    } catch (e) {
      console.error(e);
      throw new Error("Error al crear la relacion en Distribucion Nacional");
    }
  }

  async actualizarCantidadVacunasDeLote(lote, body, transaction) {
    try {
      const loteModificado = await Lote.update(
        { cantidad: lote.cantidad - body.cantidad },
        {
          where: {
            nroLote: lote.nroLote
          },
          transaction: transaction
        });
    
      // return loteModificado;
    } catch (e) {
      console.error(e);
      throw new Error("Error al actualizar la cantidad de vacunas del lote");
    }
  }

  async traerSublotesDeUnDepositoProv(deposito_id, { offset, limit }) {
    try {
      const opciones = {
        where: {
          deposito: deposito_id
        },
        include: [
          {
            model: SubLote,
            required: true,
            where: {
              cantidad: {
                [Op.gt]: 0
              }
            },
            include: [
              {
                model: Lote,
                attributes: { exclude: ["cantidad", "fechaFabricacion", "fechaCompra"] },
                required: true,
                include: [
                  {
                    model: Vacuna,
                    required: true,
                    include: [
                      {
                        model: TipoVacuna,
                        required: true
                      },
                      {
                        model: Laboratorio,
                        attributes: { exclude: ["pais_id"] },
                        required: true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
  
      if (offset) opciones.offset = +offset;
      if (limit) opciones.limit = +limit;
  
      const { rows, count } = await DistribucionNacional.findAndCountAll(opciones);
  
      const sublotes = rows.map(s => {
        return {
          tipoVacuna: s.SubLote.Lote.Vacuna.TipoVacuna.tipo,
          cantidad: s.SubLote.cantidad,
          vencimiento: Utils.formatearFecha(s.SubLote.Lote.vencimiento),
          nombreComercial: s.SubLote.Lote.Vacuna.nombreComercial,
          laboratorio: s.SubLote.Lote.Vacuna.Laboratorio.nombre,
        };
      });
    
      return { sublotes, cantidadSublotes: count };
    } catch (e) {
      console.error(e);
      throw new Error("Error al traer el stock de sublotes");
    }
  }

  async traerlotesDeUnDepositoNac(deposito_id, { offset, limit }) {
    try {
      const opciones = {
        where: {
          deposito: deposito_id
        },
        include: [
          {
            model: Lote,
            attributes: { exclude: ["fechaFabricacion", "fechaCompra"] },
            required: true,
            include: [
              {
                model: Vacuna,
                required: true,
                include: [
                  {
                    model: TipoVacuna,
                    required: true
                  },
                  {
                    model: Laboratorio,
                    attributes: { exclude: ["pais_id"] },
                    required: true
                  }
                ]
              }
            ]
          }
        ]
      }
  
      if (offset) opciones.offset = +offset;
      if (limit) opciones.limit = +limit;
  
      const { rows, count } = await Almacena.findAndCountAll(opciones);
  
      const lotes = rows.map(l => {
        return {
          tipoVacuna: l.Lote.Vacuna.TipoVacuna.tipo,
          cantidad: l.Lote.cantidad,
          vencimiento: Utils.formatearFecha(l.Lote.vencimiento),
          nombreComercial: l.Lote.Vacuna.nombreComercial,
          laboratorio: l.Lote.Vacuna.Laboratorio.nombre,
        };
      });
    
      return { lotes, cantidadLotes: count };
    } catch (e) {
      console.error(e);
      throw new Error("Error al traer el stock de lotes");
    }
  }

  #crearOpcionesDeListado({ orden, dir, offset, limit }) {
    // orden: "tipo", "fecha", "cantidad", "estado"
    const opciones = {};
  
    // opciones.attributes = { exclude: ['estado'] },
  
    opciones.include = [
      {
        model: TipoVacuna,
        required: true
      }
    ];
  
    opciones.where = {
      estado: "PENDIENTE"
    };
  
    if (orden) {
      opciones.order = [this.#calcularElOrdenDelListadoDeSolicitudes(orden, dir)];
    }
  
    if (offset) {
      opciones.offset = offset;
    }
  
    if (limit) {
      opciones.limit = limit;
    }
  
    return opciones;
  }

  #calcularElOrdenDelListadoDeSolicitudes(order, direccion) {
    const orden = [];
  
    if (order === "tipo") {
      orden.push(...[TipoVacuna, "tipo", direccion]);
    }
  
    if (order === "fecha") {
      orden.push(...["fechaSolicitud", direccion]);
    }
  
    if (order === "cantidad") {
      orden.push(...["cantidad", direccion]);
    }
  
    if (order === "estado") {
      orden.push(...["estado", direccion]);
    }
  
    return orden;
  }
}

const loteServicio = Object.freeze(new LoteServicio());

export default loteServicio;