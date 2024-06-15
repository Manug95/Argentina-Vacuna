import { Router } from "express";
import { LoteController } from "../controladores/lote.controller.js";

const loteRouter = Router();


loteRouter.get("/comprar", LoteController.vistaLComprarLote);

// loteRouter.get("/registrar", LoteController.vistaRegistro);

// loteRouter.get("/listar", LoteController.listar);

loteRouter.post("/nuevo", LoteController.crear);


export { loteRouter };