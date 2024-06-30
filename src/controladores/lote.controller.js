import { Op } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import pug from "pug";
import { faker } from '@faker-js/faker';
import { randomUUID } from "node:crypto";
import { 
  Lote, 
  TipoVacuna, 
  Laboratorio, 
  DepositoNacional, 
  Almacena, 
  Vacuna, 
  DepositoProvincial
} from "../modelos/relaciones.js";
import * as loteControladorUtils from "./utils/loteControladorUtils.js";
import { StockNacionalError } from "../modelos/Errores/stockErrors.js";
import { resolverError, isSotckNacionalError } from "../modelos/Errores/resolverErrores.js";

export class LoteController {

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

      const lote = await loteControladorUtils.traerLotesDeLasVacunasRequeridas(body);
      
      if (!lote) {
        await loteControladorUtils.guardarSolicitudDeVacuna(body);
        throw new StockNacionalError("No hay stock de la vacuna solicita. Se ha agregado a la lista de compras pendientes");
      }

      const nuevoSubLote = await loteControladorUtils.crearNuevoSubLote(lote, body, t);

      // guardo la relacion del nuevo sublote con el deposito provincial al que se envia
      await loteControladorUtils.crearDistribucionNacional(nuevoSubLote, body, t);

      // actualizo la cantidad de vacunas del lote al que se le hizo el sublote
      await loteControladorUtils.actualizarCantidadVacunasDeLote(lote, body, t);

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

  static async depositosConStock(req, res) {
    const vacuna = req.params.vacuna;
    const cantidad = req.query.cantidad;
    let status = 201;
    const respuesta = {};
    let depositos;

    try {
      depositos = (await Almacena.findAll({
        attributes: ["deposito"],
        group: "nombre",
        order: [[DepositoNacional, 'nombre', 'ASC']],
        include: [
          {
            model: Lote,
            attributes: ["nroLote", "vacuna_id"],
            where: {
              [Op.and]: [
                {
                  vacuna_id: {
                    [Op.not]: null
                  }
                },
                {
                  cantidad: {
                    [Op.gte]: cantidad
                  }
                }
              ]
            },
            include: [
              {
                model: Vacuna,
                attributes: ["id", "tipoVacuna_id"],
                where: {
                  TipoVacuna_id: {
                    [Op.not]: null
                  }
                },
                include: [
                  {
                    model: TipoVacuna,
                    where: {
                      id: vacuna
                    }
                  }
                ]
              }
            ]
          },
          DepositoNacional
        ]
      }))
      .map(d => d.toJSON().DepositoNacional);

      console.log(depositos);

      respuesta.ok = true;
      respuesta.body = depositos;
      // respuesta.body = [{id: "1", nombre: "Deposito Nacional A"}];
    } catch (e) {
      status = 404;
      respuesta.ok = false;
      respuesta.mensaje = "no se encontraron resultados";
      console.error(e);
    } finally {
      res.status(status).json(respuesta);
    }

    return;
  }

  static async vistaRegistro (req, res){
    let tiposVacuanas;
    let laboratorios;
    let depositos;

    try {
      tiposVacuanas = await TipoVacuna.findAll();
      depositos = await DepositoNacional.findAll();
      laboratorios = await Laboratorio.findAll();
    } catch(e) {
      console.error(e);
    }

    res.send(pug.renderFile("src/vistas/formularios/registrarLote.pug", {
      pretty: true,
      tiposVacuanas,
      depositos,
      laboratorios
    }));

    return;
  }

  static async vistaComprarLote (req, res) {
    const resultadosConsultas = {};
    const { vacunaSolicitada } = req.query;

    try {
      const [ depositosNac, vacunas ] = await Promise.all([
        DepositoNacional.findAll(),
        Vacuna.findAll({
          include: [TipoVacuna, { model: Laboratorio, attributes: ["id", "nombre"] }]
        })
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

  static async vistaSolicitarLoteNacion (req, res) {
    const resultadosConsultas = {};

    try {
      const [ depositosProv, vacunas ] = await Promise.all([
        DepositoProvincial.findAll(),
        Vacuna.findAll({
          group: "tipo",
          order: [[TipoVacuna, 'tipo', 'ASC']],
          include: [
            TipoVacuna
          ]
        })
      ]);

      resultadosConsultas.depositosProv = depositosProv;
      resultadosConsultas.vacunas = vacunas.map(v => v.toJSON());
      
    } catch(e) {
      console.error(e);
    } finally {
      res.send(pug.renderFile("src/vistas/provinciales/solicitarLote.pug", {
        pretty: true,
        activeLink: "sol-nac",
        depositosProv: resultadosConsultas.depositosProv ?? [],
        vacunas: resultadosConsultas.vacunas ?? []
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
      Object.assign(resultadosConsultas, await loteControladorUtils.findAndCountAllSolicitudCompra(req.query));
    }
    catch (error) {
      resultadosConsultas.error = true;
      console.log(error.message);
    } finally {
      res.send(pug.renderFile("src/vistas/nacionales/listadoSolicitudes.pug", {
        pretty: true,
        activeLink: "listado-sol",
        solicitudes: resultadosConsultas.solicitudes,
        cantidadPaginadores: Math.floor(resultadosConsultas.count / 10 + 1),
        error: resultadosConsultas.error
      }));
    }

    return;
  }

  static async VistaListadoSubLotesEnDepositoProv(req, res) {
    const respuesta = { error: false };

    try {
      respuesta.depositosProv = await DepositoProvincial.findAll();
    }
    catch (error) {
      respuesta.error = true;
      console.log(error.message);
    }
    finally {
      res.send(pug.renderFile("src/vistas/listadodeStock.pug", {
        pretty: true,
        activeLink: "listado-sublotes",
        depositosProv: respuesta.depositosProv,
        paginadores: 1,
        error: respuesta.error,
        nacional: false
      }));
    }

    return;
  }

  static async VistaListadoLotesEnDepositoNac(req, res) {
    const respuesta = { error: false };

    try {
      respuesta.depositosNac = await DepositoNacional.findAll();
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

  static async listadoSubLotesEnDepositoProv(req, res) {
    const { deposito_id } = req.params;

    let status = 200;
    const respuesta = {};

    try {
      const [ sublotesDelDepositoSeleccionado, depositoSeleccionado ] = await Promise.all([
        loteControladorUtils.traerSublotesDeUnDepositoProv(deposito_id, req.query),
        DepositoProvincial.findByPk(deposito_id)
      ]);

      respuesta.depositoSeleccionado = depositoSeleccionado.nombre;
      respuesta.sublotes = sublotesDelDepositoSeleccionado.sublotes;
      respuesta.paginadores = Math.floor(sublotesDelDepositoSeleccionado.cantidadSublotes / 10 + 1) ?? 1;
      
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

  static async listadoLotesEnDepositoNac(req, res) {
    const { deposito_id } = req.params;

    let status = 200;
    const respuesta = {};

    try {
      const [ lotesDelDepositoSeleccionado, depositoSeleccionado ] = await Promise.all([
        loteControladorUtils.traerlotesDeUnDepositoNac(deposito_id, req.query),
        DepositoNacional.findByPk(deposito_id)
      ]);

      respuesta.depositoSeleccionado = depositoSeleccionado.nombre;
      respuesta.lotes = lotesDelDepositoSeleccionado.lotes;
      respuesta.paginadores = Math.floor(lotesDelDepositoSeleccionado.cantidadLotes / 10 + 1) ?? 1;
      
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
