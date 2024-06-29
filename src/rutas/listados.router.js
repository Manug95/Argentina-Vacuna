import { Router } from "express";
import stockRouter from "./listados.stock.router.js";
import { LoteController } from "../controladores/lote.controller.js";

const listadosRouter = Router();


listadosRouter.use("/stock", stockRouter);

listadosRouter.get("/solicitudes-compra", LoteController.vistaListadoSolicitudesDeCompra);


export default listadosRouter;