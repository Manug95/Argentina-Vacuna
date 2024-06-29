import { Router } from "express";
import solicitarRouter from "./lote.solicitar.router.js";
import { LoteController } from "../controladores/lote.controller.js";

const loteRouter = Router();


loteRouter.use("/solicitar", solicitarRouter);


loteRouter.get("/comprar", LoteController.vistaComprarLote);

// loteRouter.get("/registrar", LoteController.vistaRegistro);

loteRouter.post("/nuevo", LoteController.crear);


export default loteRouter;