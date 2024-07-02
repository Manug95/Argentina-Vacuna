import { getElementById } from "./frontUtils.js";
import { renderizarTabla, crearFilaMensaje } from "./tablaStock.js";
import Paginador from "./paginador.js";
import { enviarGET } from "./httpRequests.js";

document.addEventListener("DOMContentLoaded", () => {
  const paginador = new Paginador();
  paginador.setFuncionEnviarPeticionPaginador(eventoClicksDeLasPaginasDelPaginador(paginador.instanciaPaginador));

  getElementById("deposito-nac").addEventListener("change", async (e) => {
    const id = e.target.value;
    const datos = await enviarPeticion(id, 0, paginador.resultadosPorPagina);
    const { lotes, depositoSeleccionado } = datos;
    
    if (datos) {
      if (lotes.length > 0) {
        renderizarTabla(lotes, depositoSeleccionado);
        paginador.cantidadPaginadores = datos.paginadores;
      } else {
        paginador.resetCantidadPaginadores();
        crearFilaMensaje("NO HAY STOCK EN ESTE DEPOSITO");
      }
    } else {
      paginador.resetCantidadPaginadores();
      crearFilaMensaje("NO SE PUDO CARGAR EL STOCK DEL DEPOSITO");
    }

    paginador.actualizarPaginador();
  });

  const paginadorElement = getElementById("paginador");

  paginadorElement.firstElementChild.addEventListener("click", paginador.setNavegacion("izq"));
  paginadorElement.lastElementChild.addEventListener("click", paginador.setNavegacion("der"));
});

function eventoClicksDeLasPaginasDelPaginador(paginador) {
  return async () => {
    const idDepositoSeleccionado = getElementById("deposito-nac").value;

    const offset = (paginador.paginaActual - 1) * paginador.resultadosPorPagina;

    const datos = await enviarPeticion(idDepositoSeleccionado, offset, paginador.resultadosPorPagina);
    
    if (datos) {
      renderizarTabla(datos.lotes, datos.depositoSeleccionado);
    } else {
      paginador.resetCantidadPaginadores();
      crearFilaMensaje("NO SE PUDO CARGAR EL STOCK DEL DEPOSITO");
    }

    paginador.actualizarPaginador();
  }
}

async function enviarPeticion(id, offset, limit) {
  let url = `/listados/stock/nacion/${id}`;
  if (offset>=0 && limit) url += `?offset=${offset}&limit=${limit}`;

  return await enviarGET(url);
}