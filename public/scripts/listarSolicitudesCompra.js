import { getElementById, agregarClases, removerClases } from "./frontUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  [...document.getElementsByClassName("ordenable")].forEach(span => {
    span.addEventListener("click", crearEstadoColumnas());
  });
});

function crearEstadoColumnas() {
  let dir = "";
  let columnaActual = "";
  // let columnaAnterior = "";

  return (evento) => {
    if (dir === "" || dir === "DESC") {
      dir = "ASC";
    } else {
      dir = "DESC";
    }

    // columnaAnterior = columnaActual;
    // aca creo que tengo que hacer algo con la columna anterior que se haya ordenado
    const eventTarget = evento.target;
    if (eventTarget.nodeName === "I") {
      columnaActual = eventTarget.parentElement.parentElement.id;
    } else {
      columnaActual = eventTarget.parentElement.id;
    }

    actulizarFlechaOrdenColumna(columnaActual, dir);

    // console.log(evento);

    //ordenar la columna...
  };
}

function actulizarFlechaOrdenColumna(col, dir) {
  [...document.getElementsByTagName("i")].forEach(el => {
    if (el.id.includes(col)) {
      if (dir === "ASC") {
        removerClases(el, "bi-arrow-down");
        agregarClases(el, "bi-arrow-up");
      } else {
        removerClases(el, "bi-arrow-up");
        agregarClases(el, "bi-arrow-down");
      }
    } else {
      removerClases(el, "bi-arrow-down", "bi-arrow-up");
    }
  });
}