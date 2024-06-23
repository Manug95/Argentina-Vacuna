import { Router } from "express";
import { solicitarRouter } from "./lote.solicitar.router.js";
import { LoteController } from "../controladores/lote.controller.js";

const loteRouter = Router();


loteRouter.use("/solicitar", solicitarRouter);


loteRouter.get("/comprar", LoteController.vistaComprarLote);

// loteRouter.get("/solicitar", LoteController.vistaSolicitarLote);

// loteRouter.get("/registrar", LoteController.vistaRegistro);

// loteRouter.get("/listar", LoteController.listar);

loteRouter.post("/nuevo", LoteController.crear);


export { loteRouter };