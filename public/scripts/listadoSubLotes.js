import { getElementById, createElement, agregarClases, removerClases } from "./frontUtils.js";
import EstadoPaginador from "./estadoPaginador.js";
import { enviarGET } from "./httpRequests.js";

const estadoPaginador = new EstadoPaginador();

document.addEventListener("DOMContentLoaded", () => {
  getElementById("deposito-Prov").addEventListener("change", async (e) => {
    const id = e.target.value;
    const datos = await enviarPeticion(id, 0, estadoPaginador.resultadosPorPagina);
    
    if (datos) {
      renderizarTabla(datos);
      estadoPaginador.cantidadPaginadores = datos.paginadores;
      actualizarPaginador(datos);
    } else {
      crearFilaMensaje("NO SE PUDO CARGAR EL STOCK DEL DEPOSITO");
      actualizarPaginador();
    }
  });

  const paginador = getElementById("paginador");

  const navegarPaginador = (dir) => {
    return async (e) => {
      if (e.target.classList.contains("disabled")) return;

      if (dir === "der") {
        estadoPaginador.incrementarPagina();
      } else {
        estadoPaginador.decrementarPagina();
      }

      await enviarPeticionPaginador();

      actualizarPaginador();
    };
  }

  paginador.firstElementChild.addEventListener("click", navegarPaginador("izq"));
  paginador.lastElementChild.addEventListener("click", navegarPaginador("der"));
});

function renderizarTabla({ sublotes, depositoSeleccionado }) {
  getElementById("titulo").textContent = "Listado de Sub lotes " + depositoSeleccionado;
  const tabla = getElementById("cuerpo");
  tabla.innerHTML = "";

  if (sublotes.length > 0) {
    sublotes.forEach(sl => {
      const fila = createElement("tr", {});

      Object.keys(sl).forEach(key => {
        fila.appendChild(createElement("td", { content: sl[key].toString() }, "ps-3", "align-middle", "text-center"));
      });
      // fila.appendChild(createElement("td", { content: sl.tipoVacuna }, "ps-3", "align-middle", "text-center"));
      // fila.appendChild(createElement("td", { content: sl.cantidad.toString() }, "ps-3", "align-middle", "text-center"));
      // fila.appendChild(createElement("td", { content: sl.vencimiento }, "ps-3", "align-middle", "text-center"));
      // fila.appendChild(createElement("td", { content: sl.nombreComercial }, "ps-3", "align-middle", "text-center"));
      // fila.appendChild(createElement("td", { content: sl.laboratorio }, "ps-3", "align-middle", "text-center"));
      fila.appendChild(
        createElement(
          "td", 
          { 
            content: createElement("a", { content: "Descartar", href:"#" }, "btn", "btn-primary")//, "p-1")
          }, 
          "ps-3", "align-middle", "text-center"
        ));

        tabla.appendChild(fila);
    });
  } else {
    crearFilaMensaje("NO HAY STOCK EN ESTE DEPOSITO", tabla);
  }

  agregarClases(tabla, "table-group-divider");
  
}

function crearFilaMensaje(mensaje, tabla = getElementById("cuerpo")) {
  tabla.innerHTML = "";
  const fila = createElement("tr", {});
  const td = createElement("td", { content: mensaje }, "align-middle", "text-center");
  td.colSpan = "6";
  fila.appendChild(td);
  tabla.appendChild(fila);
  actualizarPaginador();
}

function actualizarPaginador() {
  removerPaginadores();
  let i = 0;

  while (i < estadoPaginador.cantidadPaginadores) {
    const li = createElement("li", {}, "page-item");
    const span = createElement("span", { content: (i+1).toString() }, "page-link", "cursor-pointer");

    if (i === estadoPaginador.paginaActual - 1) {
      agregarClases(span, "active");
    } else {
      removerClases(span, "active");
    }

    li.appendChild(span);

    li.addEventListener("click", (() => {
      let pagina = i+1;
      return (e) => {
        // estadoPaginador.paginaActual = pagina;
        if (!e.target.classList.contains("active")) {
          estadoPaginador.paginaActual = pagina;
          enviarPeticionPaginador();
        }
      };
    })());

    getElementById("flecha-pag-der").before(li);

    i++;
  }

  estadoPaginador.actualizarFlechasPaginador();
}

function removerPaginadores() {
  const ul = getElementById("paginador");
  const liElements = ul.getElementsByTagName("li");

  if (liElements.length > 2) {
    for (let i = liElements.length - 2; i > 0; i--) {
      ul.removeChild(liElements[i]);
    }
  }
}

async function enviarPeticionPaginador() {
  const idDepositoSeleccionado = getElementById("deposito-Prov").value;

  const offset = (estadoPaginador.paginaActual - 1) * estadoPaginador.resultadosPorPagina;

  const datos = await enviarPeticion(idDepositoSeleccionado, offset, estadoPaginador.resultadosPorPagina);
  
  if (datos) {
    renderizarTabla(datos);
    // estadoPaginador.cantidadPaginadores = datos.paginadores;
    actualizarPaginador(datos);
  } else {
    crearFilaMensaje("NO SE PUDO CARGAR EL STOCK DEL DEPOSITO");
    actualizarPaginador();
  }
}

async function enviarPeticion(id, offset, limit) {
  let url = `/listados/stock/provincia/${id}`;
  if (offset>=0 && limit) url += `?offset=${offset}&limit=${limit}`;

  return await enviarGET(url);
}