import { Router } from "express";
import subloteRouter from "./sublote.router.js";
import LoteController from "../controladores/lote.controller.js";

const loteRouter = Router();


loteRouter.use("/sublotes", subloteRouter);


loteRouter.get("/comprar", LoteController.vistaComprarLote);

loteRouter.get("/stock", LoteController.VistaListadoLotes);

// loteRouter.get("/nacion/:deposito_id", LoteController.listadoLotes);
loteRouter.get("/stock/:deposito_id", LoteController.listadoLotes);

loteRouter.get("/solicitudes-compra", LoteController.vistaListadoSolicitudesDeCompra);

loteRouter.post("/nuevo", LoteController.crear);


export default loteRouter;