import { DepositoProvincial, DepositoNacional, Vacuna, TipoVacuna, Laboratorio } from "../modelos/relaciones.js";

let instanciaServicio;

class ConsultasEstaticas {
  #depositosProvinciales;
  #depostiosNacionales;
  #vacunas;
  #tiposVacunas;

  constructor() {
    if (instanciaServicio) {
      throw new Error("Solo se puede crear una instancia!");
    }
    instanciaServicio = this;

    this.#depositosProvinciales = [];
    this.#depostiosNacionales = [];
    this.#vacunas = [];
    this.#tiposVacunas = [];
  }

  async getDepositosProvinciales() {
    if (this.#depositosProvinciales.length === 0) {
      await this.#traerDepositosProvinciales();
    }

    return this.#depositosProvinciales;
  }

  async getDepositosNacionales() {
    if (this.#depostiosNacionales.length === 0) {
      await this.#traerDepositosNacionales();
    }

    return this.#depostiosNacionales;
  }

  async getVacunas() {
    if (this.#vacunas.length === 0) {
      await this.#traerVacunas();
    }

    return this.#vacunas;
  }

  async getTiposVacunas() {
    if (this.#tiposVacunas.length === 0) {
      await this.#traerTiposVacunas();
    }

    return this.#tiposVacunas;
  }

  async #traerDepositosProvinciales() {
    try {
      this.#depositosProvinciales = await DepositoProvincial.findAll();
    } catch (e) {
      console.error(e);
    }
  }
  
  async #traerDepositosNacionales() {
    try {
      this.#depostiosNacionales = await DepositoNacional.findAll();
    } catch (e) {
      console.error(e);
    }
  }
  
  async #traerVacunas() {
    try {
      this.#vacunas = await Vacuna.findAll({
        include: [TipoVacuna, { model: Laboratorio, attributes: ["id", "nombre"] }]
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  async #traerTiposVacunas() {
    try {
      this.#tiposVacunas = await Vacuna.findAll({
        group: "tipo",
        order: [[TipoVacuna, 'tipo', 'ASC']],
        include: [
          TipoVacuna
        ]
      });
    } catch (e) {
      console.error(e);
    }
  }
}

const consultasEstaticas = Object.freeze(new ConsultasEstaticas());

export default consultasEstaticas;