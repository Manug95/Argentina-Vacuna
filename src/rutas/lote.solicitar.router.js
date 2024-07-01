import { Router } from "express";
import { LoteController } from "../controladores/lote.controller.js";

const solicitarRouter = Router();

solicitarRouter.get("/nacion", LoteController.vistaSolicitarLoteNacion);

solicitarRouter.post("/nacion", LoteController.enviarSubLoteADepositoProv);


export default solicitarRouter;