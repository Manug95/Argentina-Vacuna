import { getElementById, createElement } from "./frontUtils.js";

export function renderizarTablaStock(datos, depositoSeleccionado) {
  getElementById("titulo").textContent = "Stock disponible en " + depositoSeleccionado;
  const tabla = getElementById("cuerpo");
  tabla.innerHTML = "";

  datos.forEach(sl => {
    const fila = createElement("tr", {});

    Object.keys(sl).forEach(key => {
      fila.appendChild(createElement("td", { content: sl[key].toString() }, "align-middle", "text-center", "text-break"));
    });

    fila.appendChild(
      createElement(
        "td", 
        { 
          content: createElement("a", { content: "Descartar", href:"#" }, "btn", "btn-primary")
        }, 
        "ps-3", "align-middle", "text-center"
      ));

      tabla.appendChild(fila);
  });
  
}

export function crearFilaMensajeDeTablaStock(mensaje, tabla = getElementById("cuerpo")) {
  tabla.innerHTML = "";
  const fila = createElement("tr", {});
  const td = createElement("td", { content: mensaje, colSpan: "6" }, "align-middle", "text-center");
  fila.appendChild(td);
  tabla.appendChild(fila);
}

export function renderizarTablaSolicitudesCompra(datos) {
  const tabla = getElementById("cuerpo");
  tabla.innerHTML = "";

  datos.forEach(s => {
    const fila = createElement("tr", {});

    Object.keys(s).forEach(key => {
      if (key !== "tipoVacunaId"){
        fila.appendChild(createElement("td", { content: s[key].toString() }, "align-middle", "text-center", "text-break"));
      }
    });

    fila.appendChild(
      createElement(
        "td", 
        { 
          content: createElement("a", { content: "Comprar", href:"#" }, "btn", "btn-primary")
        }, 
        "ps-3", "align-middle", "text-center"
      ));

      tabla.appendChild(fila);
  });
  
}

export function crearFilaMensajeDeTablaSolicitudesCompra(mensaje, tabla = getElementById("cuerpo")) {
  tabla.innerHTML = "";
  const fila = createElement("tr", {});
  const td = createElement("td", { content: mensaje, colSpan: "4" }, "align-middle", "text-center");
  fila.appendChild(td);
  tabla.appendChild(fila);
}