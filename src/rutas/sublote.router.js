import { Router } from "express";
import SubLoteController from "../controladores/sublote.controller.js";
import LoteController from "../controladores/lote.controller.js";

const subloteRouter = Router();


subloteRouter.get("/stock", SubLoteController.VistaListadoSubLotes);

// subloteRouter.get("/provincia/:deposito_id", SubLoteController.listadoSubLotes);
subloteRouter.get("/stock/:deposito_id", SubLoteController.listadoSubLotes);

subloteRouter.get("/solicitar", SubLoteController.vistaSolicitarSubLote);

// loteRouter.post("/nacion", LoteController.enviarSubLoteADepositoProv);
subloteRouter.post("/nuevo", LoteController.enviarSubLoteADepositoProv);


export default subloteRouter;