// const { datosUsuarioIncompletos, datosIncompletosLogin } = require("../server_scripts/validacionesDeModelos.js");
import pug from "pug";
import { faker } from '@faker-js/faker';
import { randomUUID } from "node:crypto";
import { Lote, TipoVacuna, Laboratorio, DepositoNacional, Almacena, Vacuna } from "../modelos/relaciones.js";

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
        deposito: body.deposito
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

  static async vistaLComprarLote (req, res) {
    let depositos = [];
    let vacunas = [];

    try {
      depositos = await DepositoNacional.findAll();
      vacunas = await Vacuna.findAll({
        include: [TipoVacuna, { model: Laboratorio, attributes: ["id", "nombre"] }]
      });

      vacunas = vacunas
      .map(v => v.dataValues)
      .map(v => { v.Laboratorio = v.Laboratorio.dataValues; return v })
      .map(v => { v.TipoVacuna = v.TipoVacuna.dataValues; return v });
      
    } catch(e) {
      console.error(e);
    }

    res.send(pug.renderFile("src/vistas/formularios/comprarLote.pug", {
      pretty: true,
      depositos,
      vacunas,
      active: "comprar"
    }));

    return;
  }
  
}





