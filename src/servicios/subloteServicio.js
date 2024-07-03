import { Op } from "sequelize";
import { 
  DistribucionNacional,
  SubLote,
  Lote,
  Vacuna,
  TipoVacuna,
  Laboratorio
} from "../modelos/relaciones.js";
import Utils from "./Utils.js";
import { randomUUID } from "node:crypto";
import { CrearSubLoteError } from "../modelos/Errores/stockErrors.js";

let instanciaServicio;

class SubLoteServicio {

  constructor() {
    if (instanciaServicio) {
      throw new Error("Solo se puede crear una instancia!");
    }
    instanciaServicio = this;
  }

  async traerSublotesPorDeposito(deposito_id, { offset, limit, order, orderType }) {
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
      if (order) opciones.order = [this.#calcularOrderEnTraerSublotesPorDeposito(order, orderType)];
      
  
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

  async crearNuevoSubLote({ nroLote }, { cantidad }, transaction) {
    try {
      const id = randomUUID();
      const createParams = [
        {
          id,
          lote: nroLote,
          cantidad: cantidad
        }
      ];

      if (transaction) createParams.push({ transaction: transaction });
      
      const nuevoSubLote = await SubLote.create(...createParams);
  
      return nuevoSubLote;
    } catch (e) {
      console.error(e);
      throw new CrearSubLoteError("Error al crear el sub lote");
    }
  }

  async crearDistribucionNacional({ id }, { depositoProv }, transaction) {
    try {
      const createParams = [
        {
          deposito: depositoProv,
          sublote: id,
          fechaSalida: new Date(),
          fechaLlegada: new Date()
        }
      ];

      if (transaction) createParams.push({ transaction: transaction })

      const subLoteDistribuido = await DistribucionNacional.create(...createParams);
    
      // return subLoteDistribuido;
    } catch (e) {
      console.error(e);
      throw new Error("Error al crear la relacion en Distribucion Nacional");
    }
  }

  #calcularOrderEnTraerSublotesPorDeposito(order, orderType) {
    let orderArray;

    if (order === "tipo-vacuna") {
      orderArray = [SubLote, Lote, Vacuna, TipoVacuna, "tipo", orderType];
    }

    if (order === "cantidad") {
      orderArray = [SubLote, "cantidad", orderType];
    }

    if (order === "vencimiento") {
      orderArray = [SubLote, Lote, "vencimiento", orderType];
    }

    if (order === "nombre-comercial") {
      orderArray = [SubLote, Lote, Vacuna, "nombreComercial", orderType];
    }

    if (order === "laboratorio") {
      orderArray = [SubLote, Lote, Vacuna, Laboratorio, "nombre", orderType];
    }

    return orderArray;
  }

}

const subloteServicio = Object.freeze(new SubLoteServicio());

export default subloteServicio;