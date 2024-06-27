import { Router } from "express";
import { LoteController } from "../controladores/lote.controller.js";

const solicitarRouter = Router();

solicitarRouter.get("/listar-solicitudes-compra", LoteController.vistaListadoSolicitudesDeCompra);

solicitarRouter.get("/nacion", LoteController.vistaSolicitarLoteNacion);

solicitarRouter.post("/nacion", LoteController.enviarSubLoteADepositoProv);

// solicitarRouter.get("/nacion/:vacuna", LoteController.depositosConStock);

// solicitarRouter.get("/provincia", LoteController.vistaLComprarLote);


export { solicitarRouter };