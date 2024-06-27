import { 
  StockNacionalError, 
  GuardarSolicitudError,
  CrearSubLoteError 
} from "./stockErrors.js";

export function resolverError(e) {
  let mensaje = "Se ha producido un error";
  let status = 400;

  if (isSotckNacionalError(e)) {
    mensaje = e.message;
    status = 200;
  }

  if (isGuardarSolicitudError(e)) {
    mensaje = e.message;
  }

  if (isCrearSubLoteError(e)) {
    status = 500;
  }

  return {
    mensaje,
    status
  }
}

export function isSotckNacionalError(e) {
  return e instanceof StockNacionalError;
}

function isGuardarSolicitudError(e) {
  return e instanceof GuardarSolicitudError;
}

function isCrearSubLoteError(e) {
  return e instanceof CrearSubLoteError;
}