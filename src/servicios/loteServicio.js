import { Op } from "sequelize";
import {
  SolicitudCompra,
  TipoVacuna,
  Lote,
  Vacuna,
  Laboratorio,
  Almacena
} from "../modelos/relaciones.js";
import { GuardarSolicitudError } from "../modelos/Errores/stockErrors.js";
import Utils from "./Utils.js";

let instanciaServicio;

class LoteServicio {
  constructor() {
    if (instanciaServicio) {
      throw new Error("Solo se puede crear una instancia!");
    }
    instanciaServicio = this;
  }

  async traerSolicitudesDeCompra(queryParams) {
    try {
      const { count, rows } = await SolicitudCompra.findAndCountAll(this.#crearOpcionesDeListado(queryParams));
  
      const solicitudes = rows
      .map(s => s.toJSON())
      .map(s => {
        return {
          tipoVacuna: s.TipoVacuna.tipo,
          cantidad: s.cantidad,
          fechaSolicitud: Utils.formatearFecha(s.fechaSolicitud),
          tipoVacunaId: s.TipoVacuna.id
        };
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

  async traerLotesPorDeposito(deposito_id, { offset, limit, order, orderType }) {
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
      if (order) opciones.order = [this.#calcularOrderEnTraerLotesPorDeposito(order, orderType)];
  
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

  #crearOpcionesDeListado({ order, orderType, offset, limit }) {
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
  
    if (order) {
      opciones.order = [this.#calcularElOrdenDelListadoDeSolicitudes(order, orderType)];
    }
  
    if (offset) {
      opciones.offset = offset;
    }
  
    if (limit) {
      opciones.limit = +limit;
    }
  
    return opciones;
  }

  #calcularElOrdenDelListadoDeSolicitudes(order, direccion) {
    const orden = [];
  
    if (order === "tipo-vacuna") {
      orden.push(...[TipoVacuna, "tipo", direccion]);
    }
  
    if (order === "fecha") {
      orden.push(...["fechaSolicitud", direccion]);
    }
  
    if (order === "cantidad") {
      orden.push(...["cantidad", direccion]);
    }
  
    // if (order === "estado") {
    //   orden.push(...["estado", direccion]);
    // }
  
    return orden;
  }

  #calcularOrderEnTraerLotesPorDeposito(order, orderType) {
    let orderArray;

    if (order === "tipo-vacuna") {
      orderArray = [Lote, Vacuna, TipoVacuna, "tipo", orderType];
    }

    if (order === "cantidad") {
      orderArray = [Lote, "cantidad", orderType];
    }

    if (order === "vencimiento") {
      orderArray = [Lote, "vencimiento", orderType];
    }

    if (order === "nombre-comercial") {
      orderArray = [Lote, Vacuna, "nombreComercial", orderType];
    }

    if (order === "laboratorio") {
      orderArray = [Lote, Vacuna, Laboratorio, "nombre", orderType];
    }

    return orderArray;
  }
}

const loteServicio = Object.freeze(new LoteServicio());

export default loteServicio;