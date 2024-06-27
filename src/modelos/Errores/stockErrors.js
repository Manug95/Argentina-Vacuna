export class StockNacionalError extends Error {
  constructor(message) {
    super(message);
    this.name = "StockNacionalError";
  }
}

export class GuardarSolicitudError extends Error {
  constructor(message) {
    super(message);
    this.name = "GuardarSolicitudError";
  }
}

export class CrearSubLoteError extends Error {
  constructor(message) {
    super(message);
    this.name = "CrearSubLoteError";
  }
}