import { sequelize } from "../config/sequelize.js";
import pug from "pug";
import { faker } from '@faker-js/faker';
import { randomUUID } from "node:crypto";
import { 
  Lote,
  DepositoNacional, 
  Almacena
} from "../modelos/relaciones.js";
import loteServicio from "../servicios/loteServicio.js";
import subloteServicio from "../servicios/subloteServicio.js";
import consultasEstaticas from "../servicios/consultasEstaticas.js";
import { StockNacionalError } from "../modelos/Errores/stockErrors.js";
import { resolverError, isSotckNacionalError } from "../modelos/Errores/resolverErrores.js";

export default class LoteController {

  static async crear(req, res){
    let status = 201;
    const respuesta = {};

    const transaction = await sequelize.transaction();
    try {
      const body = req.body;
      const nroLote = randomUUID();
      const vencimiento = faker.date.future();
      const fechaFabricacion = faker.date.recent();

      const lote = {
        nroLote,
        vencimiento,
        fechaFabricacion,
        vacuna_id: body.vacuna,
        cantidad: body.cantidad
      };
      
      const almacen = {
        lote: nroLote,
        deposito: body.deposito,
      };
  
      const nuevoLote = await Lote.create(lote, { transaction: transaction });
      const loteAlmacenado = await Almacena.create(almacen, { transaction: transaction });

      respuesta.ok = true;
      respuesta.mensaje = "Operación exitosa";

      await transaction.commit();
    }
    catch (error) {
      console.error(error);
      status = 400;
      respuesta.ok = false;
      respuesta.mensaje = error.name === "SequelizeUniqueConstraintError" ? "Un campo esta duplicado" : error.message.replace("Validation e", "E");

      await transaction.rollback();
    }
    finally {
      res.status(status).json(respuesta);
    }

    return;
  }

  static async enviarSubLoteADepositoProv(req, res) {
    let status = 201;
    const respuesta = {};

    const t = await sequelize.transaction();
    try {
      const body = req.body;

      const lote = await loteServicio.traerLotesDeLasVacunasRequeridas(body);
      
      if (!lote) {
        await loteServicio.guardarSolicitudDeVacuna(body);
        throw new StockNacionalError("No hay stock de la vacuna solicita. Se ha agregado a la lista de compras pendientes");
      }

      const nuevoSubLote = await subloteServicio.crearNuevoSubLote(lote, body, t);

      // guardo la relacion del nuevo sublote con el deposito provincial al que se envia
      await subloteServicio.crearDistribucionNacional(nuevoSubLote, body, t);

      // actualizo la cantidad de vacunas del lote al que se le hizo el sublote
      await loteServicio.actualizarCantidadVacunasDeLote(lote, body, t);

      respuesta.ok = true;
      respuesta.mensaje = "Vacunas enviadas";

      await t.commit();
    }
    catch (error) {
      const tipoErrorResuelto = resolverError(error);
      console.log(tipoErrorResuelto.mensaje);
      
      status = tipoErrorResuelto.status
      respuesta.ok = false;
      respuesta.mensaje = tipoErrorResuelto.mensaje;

      if (!(isSotckNacionalError(error))) {
        await t.rollback();
      }
    }
    finally {
      res.status(status).json(respuesta);
    }

    return;
  }

  static async vistaComprarLote (req, res) {
    const resultadosConsultas = {};
    const { vacunaSolicitada } = req.query;

    try {
      const [ depositosNac, vacunas ] = await Promise.all([
        consultasEstaticas.getDepositosNacionales(),
        consultasEstaticas.getVacunas()
      ]);

      resultadosConsultas.depositosNac = depositosNac;
      resultadosConsultas.vacunas = vacunas.map(v => v.toJSON());
      
    } catch(e) {
      console.error(e);
    } finally {
      res.send(pug.renderFile("src/vistas/nacionales/comprarLote.pug", {
        pretty: true,
        activeLink: "comprar",
        depositos: resultadosConsultas.depositosNac ?? [],
        vacunas: resultadosConsultas.vacunas ?? [],
        vacunaSolicitada
      }));
    }

    return;
  }

  static async vistaListadoSolicitudesDeCompra (req, res){
    const resultadosConsultas = {
      solicitudes: [],
      count: 1,
      error: false
    };

    try {
      Object.assign(resultadosConsultas, await loteServicio.traerSolicitudesDeCompra(req.query));
    }
    catch (error) {
      resultadosConsultas.error = true;
      console.log(error.message);
    } finally {
      res.send(pug.renderFile("src/vistas/nacionales/listadoSolicitudes.pug", {
        pretty: true,
        activeLink: "listado-sol",
        solicitudes: resultadosConsultas.solicitudes,
        paginadores: Math.floor(resultadosConsultas.count / 10 + 1) ?? 1,
        error: resultadosConsultas.error
      }));
    }

    return;
  }

  static async VistaListadoLotes(req, res) {
    const respuesta = { error: false };

    try {
      respuesta.depositosNac = await consultasEstaticas.getDepositosNacionales();
    }
    catch (error) {
      respuesta.error = true;
      console.log(error.message);
    }
    finally {
      res.send(pug.renderFile("src/vistas/listadodeStock.pug", {
        pretty: true,
        activeLink: "listado-sublotes",
        depositosNac: respuesta.depositosNac,
        paginadores: 1,
        error: respuesta.error,
        nacional: true
      }));
    }

    return;
  }

  static async listadoLotes(req, res) {
    const { deposito_id } = req.params;

    let status = 200;
    const respuesta = {};

    try {
      const [ lotesDelDepositoSeleccionado, depositoSeleccionado ] = await Promise.all([
        loteServicio.traerLotesPorDeposito(deposito_id, req.query),
        DepositoNacional.findByPk(deposito_id)
      ]);

      respuesta.depositoSeleccionado = depositoSeleccionado.nombre;
      respuesta.lotes = lotesDelDepositoSeleccionado.lotes;

      const limit = req.query.limit ?? 10;
      respuesta.paginadores = Math.floor(lotesDelDepositoSeleccionado.cantidadLotes / limit + 1) ?? 1;
      
    }
    catch (error) {
      respuesta.error = true;
      status = 400;
      console.log(error.message);
    }
    finally {
      res.status(status).json(respuesta);
    }

    return;
  }

  static async listadoSolicitudesDeCompra(req, res) {
    let status = 200;
    const respuesta = {};

    try {
      const results = await loteServicio.traerSolicitudesDeCompra(req.query);

      respuesta.solicitudes = results.solicitudes;

      const limit = req.query.limit ?? 10;
      respuesta.paginadores = Math.floor(results.count / limit + 1) ?? 1;
      
    }
    catch (error) {
      respuesta.error = true;
      status = 400;
      console.log(error.message);
    }
    finally {
      res.status(status).json(respuesta);
    }

    return;
  }
  
}
