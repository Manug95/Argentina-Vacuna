import { getElementById, agregarClases, removerClases } from "./frontUtils.js";

export default class EstadoPaginador {
  #paginaActual;
  #cantidadPaginadores;
  #resultadosPorPagina;

  constructor({cantidadPaginadores = 1, paginaActual = 1, resultadosPorPagina = 10} = {}) {
    this.#paginaActual = paginaActual;
    this.#cantidadPaginadores = cantidadPaginadores;
    this.#resultadosPorPagina = resultadosPorPagina;
  }

  incrementarPagina() {
    this.#paginaActual++;
  }

  decrementarPagina() {
    this.#paginaActual--;
  }

  actualizarFlechasPaginador() {
    if (this.#cantidadPaginadores === 1) {
      agregarClases(getElementById("flecha-pag-der"), "disabled");
      agregarClases(getElementById("flecha-pag-izq"), "disabled");
      return;
    }
  
    if (this.#paginaActual === 1) {
      agregarClases(getElementById("flecha-pag-izq"), "disabled");
      removerClases(getElementById("flecha-pag-der"), "disabled");
      return;
    }
  
    if (this.#paginaActual < this.#cantidadPaginadores) {
      removerClases(getElementById("flecha-pag-izq"), "disabled");
      removerClases(getElementById("flecha-pag-der"), "disabled");
      return;
    }
  
    if (this.#paginaActual === this.#cantidadPaginadores) {
      removerClases(getElementById("flecha-pag-izq"), "disabled");
      agregarClases(getElementById("flecha-pag-der"), "disabled");
      return;
    }
  
    return;
  }

  get cantidadPaginadores() {
    return this.#cantidadPaginadores;
  }

  get paginaActual() {
    return this.#paginaActual;
  }

  get resultadosPorPagina() {
    return this.#resultadosPorPagina;
  }

  set cantidadPaginadores(cantidad) {
    this.#cantidadPaginadores = cantidad;
  }

  set paginaActual(pagina) {
    this.#paginaActual = pagina;
  }

  set resultadosPorPagina(resultadosPorPagina) {
    this.#resultadosPorPagina = resultadosPorPagina;
  }
}