import { getElementById, createElement, agregarClases, removerClases } from "./frontUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  getElementById("deposito-Prov").addEventListener("change", async (e) => {
    const id = e.target.value;
    const datos = await enviarPeticion(id, 0, 10);
    
    if (datos) {
      renderizarTabla(datos);
      actualizarPaginador(datos);
    } else {
      crearFilaMensaje("NO SE PUDO CARGAR EL STOCK DEL DEPOSITO");
      actualizarPaginador();
    }
  });

  const paginador = getElementById("paginador");

  const flechitasFn = (dir) => {
    return async (e) => {
      const paginadorActivo = [...paginador.getElementsByTagName("li")].filter(li => li.firstChild.classList.contains("active"))[0];
      let pagina = +paginadorActivo.innerText;

      if (dir === "der") {
        pagina++;
      } else {
        pagina--;
      }

      await enviarPeticionPaginador({pagina});

      const cantidadPaginadores = paginador.childElementCount - 2;
      actualizarPaginador({ paginadores: cantidadPaginadores }, pagina);
    };
  }

  paginador.firstElementChild.addEventListener("click", flechitasFn("izq"));
  paginador.lastElementChild.addEventListener("click", flechitasFn("der"));
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
            content: createElement("a", { content: "Descartar", href:"#" }, "btn", "btn-primary", "p-1")
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

function actualizarPaginador({ paginadores } = 1, paginaActual = 1 ) {
  removerPaginadores();
  let i = 0;

  while (i < paginadores) {
    const li = createElement("li", {}, "page-item");
    const span = createElement("span", { content: (i+1).toString() }, "page-link", "cursor-pointer");

    if (i === paginaActual - 1) {
      agregarClases(span, "active");
    } else {
      removerClases(span, "active");
    }

    li.appendChild(span);

    li.addEventListener("click", enviarPeticionPaginador);

    getElementById("flecha-pag-der").before(li);

    i++;
  }

  actualizarFlechasPaginador(paginadores, paginaActual);
}

function actualizarFlechasPaginador(paginadores, paginaActual) {
  if (paginadores === 1) {
    agregarClases(getElementById("flecha-pag-der"), "disabled");
    agregarClases(getElementById("flecha-pag-izq"), "disabled");
    return;
  }

  if (paginaActual === 1) {
    agregarClases(getElementById("flecha-pag-izq"), "disabled");
    removerClases(getElementById("flecha-pag-der"), "disabled");
    return;
  }

  if (paginaActual < paginadores) {
    removerClases(getElementById("flecha-pag-izq"), "disabled");
    removerClases(getElementById("flecha-pag-der"), "disabled");
    return;
  }

  if (paginaActual === paginadores) {
    removerClases(getElementById("flecha-pag-izq"), "disabled");
    agregarClases(getElementById("flecha-pag-der"), "disabled");
    return;
  }

  return;
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


/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @param {*} e 
 */
async function enviarPeticionPaginador(e) {
  const idDepositoSeleccionado = getElementById("deposito-Prov").value;
  let pagina;
  
  if (e.target) {
    if (e.target.nodeName === "SPAN") {
      pagina = +e.target.innerText;
    } else {
      pagina = +e.target.firstChild.innerText;
    }
  } else {
    pagina = e.pagina;
  }
  
  const offset = (pagina - 1) * 10;

  const datos = await enviarPeticion(idDepositoSeleccionado, offset, 10);
  
  if (datos) {
    renderizarTabla(datos);
    actualizarPaginador(datos, pagina);
  } else {
    crearFilaMensaje("NO SE PUDO CARGAR EL STOCK DEL DEPOSITO");
    actualizarPaginador();
  }
}

async function enviarPeticion(id, offset, limit) {
  let url = `/listados/stock/provincia/${id}`;

  if (offset>=0 && limit) url += `?offset=${offset}&limit=${limit}`;

  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    console.log(e.message);
    return null;
  }
}