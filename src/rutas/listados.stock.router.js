import { Router } from "express";
import { LoteController } from "../controladores/lote.controller.js";

const stockRouter = Router();

stockRouter.get("/provincia", LoteController.VistaListadoSubLotesEnDepositoProv);

stockRouter.get("/provincia/:deposito_id", LoteController.listadoSubLotesEnDepositoProv);


export default stockRouter;