// const { datosUsuarioIncompletos, datosIncompletosLogin } = require("../server_scripts/validacionesDeModelos.js");
import { Op } from "sequelize";
import pug from "pug";
import { faker } from '@faker-js/faker';
import { randomUUID } from "node:crypto";
import { Lote, TipoVacuna, Laboratorio, DepositoNacional, Almacena, Vacuna, DepositoProvincial, SubLote, DistribucionNacional } from "../modelos/relaciones.js";

export class LoteController {

  static async listar (req, res){
    try {
      const usuarios = await Usuario.findAll();
  
      res.status(200).json({
        ok: true,
        status: 200,
        mensaje:"Usuarios recuperados con exito",
        body: usuarios.map(u => {
          return {
            id: u.id_usuario, 
            userName: `${u.nombreUsuario} - ${u.id_usuario}`,
            permisos: []
          }
        })
      });
    }
    catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        mensaje:"Los usuarios no se pudieron recuperar",
        body: null
      });
    }
  }

  static async crear(req, res){
    let status = 201;
    const respuesta = {};

    try {
      const body = req.body;console.log(body);
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
  
      const nuevoLote = await Lote.create(lote);
      const loteAlmacenado = await Almacena.create(almacen);

      respuesta.ok = true;
      respuesta.mensaje = "Operación exitosa";
    }
    catch (error) {
      console.error(error);
      status = 400;
      respuesta.ok = false;
      respuesta.mensaje = error.name === "SequelizeUniqueConstraintError" ? "Un campo esta duplicado" : error.message.replace("Validation e", "E");
    }
    finally {
      res.status(status).json(respuesta);
    }
  }

  static async solicitar(req, res) {
    let status = 201;
    const respuesta = {};

    try {
      const body = req.body;

      // conseguir los lotes de las vacunas requeridas
      const lote = await Lote.findOne({
        attributes: ["nroLote", "vacuna_id", "cantidad"],
        where: {
          [Op.and]: [
            {
              cantidad: {
                [Op.gte]: body.cantidad
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
                [Op.eq]: body.tipoVacuna
              }
            }
          }
        ]
      });

      
      if (!lote) {
        throw new Error("no hay vacunas");
      }

      // creo la id del nuevo sublote
      const id = randomUUID();
      
      // creo y guardo el nuevo sublote
      const nuevoSubLote = await SubLote.create({
        id,
        lote: lote.nroLote,
        cantidad: body.cantidad
      });

      // guardo la relacion del nuevo sublote con el deposito provincial al que se envia
      const subLoteDistribuido = await DistribucionNacional.create({
        deposito: body.depositoProv,
        sublote: nuevoSubLote.id,
        fechaSalida: new Date(),
        fechaLlegada: new Date()
      });

      // actualizo la cantidad de vacunas del lote al que se le hizo el sublote
      const loteModificado = await Lote.update({ cantidad: lote.cantidad - body.cantidad }, {
        where: {
          nroLote: lote.nroLote
        }
      });

      respuesta.ok = true;
      respuesta.mensaje = "Operación exitosa";
    }
    catch (error) {
      // console.error(error);
      status = 400;
      respuesta.ok = false;
      respuesta.mensaje = error.message;
    }
    finally {
      res.status(status).json(respuesta);
    }
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
        active: "comprar",
        depositos: resultadosConsultas.depositosNac ?? [],
        vacunas: resultadosConsultas.vacunas ?? []
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
        active: "sol-nac",
        depositosProv: resultadosConsultas.depositosProv ?? [],
        vacunas: resultadosConsultas.vacunas ?? []
      }));
    }

    return;
  }
  
}





