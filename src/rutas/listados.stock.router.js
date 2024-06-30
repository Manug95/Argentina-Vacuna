import { Router } from "express";
import { LoteController } from "../controladores/lote.controller.js";

const stockRouter = Router();

stockRouter.get("/provincia", LoteController.VistaListadoSubLotesEnDepositoProv);

stockRouter.get("/nacion", LoteController.VistaListadoLotesEnDepositoNac);

stockRouter.get("/provincia/:deposito_id", LoteController.listadoSubLotesEnDepositoProv);

stockRouter.get("/nacion/:deposito_id", LoteController.listadoLotesEnDepositoNac);


export default stockRouter;