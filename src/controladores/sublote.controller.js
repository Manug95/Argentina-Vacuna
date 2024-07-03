import pug from "pug";
import consultasEstaticas from "../servicios/consultasEstaticas.js";
import subloteServicio from "../servicios/subloteServicio.js";
import { DepositoProvincial } from "../modelos/relaciones.js";

export default class SubLoteController {

  static async listadoSubLotes(req, res) {
    const { deposito_id } = req.params;

    let status = 200;
    const respuesta = {};

    try {
      const [ sublotesDelDepositoSeleccionado, depositoSeleccionado ] = await Promise.all([
        subloteServicio.traerSublotesPorDeposito(deposito_id, req.query),
        DepositoProvincial.findByPk(deposito_id)
      ]);

      respuesta.depositoSeleccionado = depositoSeleccionado.nombre;
      respuesta.sublotes = sublotesDelDepositoSeleccionado.sublotes;

      const limit = req.query.limit ?? 10;
      respuesta.paginadores = Math.floor(sublotesDelDepositoSeleccionado.cantidadSublotes / limit + 1) ?? 1;
      
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

  static async VistaListadoSubLotes(req, res) {
    const respuesta = { error: false };

    try {
      respuesta.depositosProv = await consultasEstaticas.getDepositosProvinciales();
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

  static async vistaSolicitarSubLote (req, res) {
    const resultadosConsultas = {};

    try {
      const [ depositosProv, vacunas ] = await Promise.all([
        consultasEstaticas.getDepositosProvinciales(),
        consultasEstaticas.getTiposVacunas()
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

}