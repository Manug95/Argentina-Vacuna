import { getElementById, agregarClases, removerClases } from "./frontUtils.js";
import { renderizarTablaSolicitudesCompra, crearFilaMensajeDeTablaSolicitudesCompra } from "./tablaStock.js";
import Paginador from "./paginador.js";
import { enviarGET } from "./httpRequests.js";

document.addEventListener("DOMContentLoaded", () => {
  const paginador = new Paginador();
  paginador.setFuncionEnviarPeticionPaginador(eventoClicksDeLasPaginasDelPaginador(paginador.instanciaPaginador));
  // paginador.actualizarPaginador();

  getElementById("consultar-btn").addEventListener("click", async () => {
    const { order, orderType } = obtenerOpcionesDeConsulta(paginador.instanciaPaginador);
    const limit = paginador.resultadosPorPagina;

    const datos = await enviarPeticion({ offset: 0, limit, order, orderType });
    
    if (datos) {
      const { solicitudes } = datos;
      
      if (solicitudes.length > 0) {
        renderizarTablaSolicitudesCompra(solicitudes);
        paginador.cantidadPaginadores = datos.paginadores;
      } else {
        paginador.resetCantidadPaginadores();
        crearFilaMensajeDeTablaSolicitudesCompra("NO HAY SOLICITUDES DE COMPRA PENDIENTES");
      }
    } else {
      paginador.resetCantidadPaginadores();
      crearFilaMensajeDeTablaSolicitudesCompra("NO SE PUDIERON CARGAR LAS SOLICITUDES DE COMPRA");
    }

    paginador.actualizarPaginador();
  });

  const paginadorElement = getElementById("paginador");

  paginadorElement.firstElementChild.addEventListener("click", paginador.setNavegacion("izq"));
  paginadorElement.lastElementChild.addEventListener("click", paginador.setNavegacion("der"));

});

function eventoClicksDeLasPaginasDelPaginador(paginador) {
  return async () => {
    const offset = (paginador.paginaActual - 1) * paginador.resultadosPorPagina;
    const limit = paginador.resultadosPorPagina;
    const { order, orderType } = obtenerOpcionesDeConsulta(paginador.instanciaPaginador);

    const datos = await enviarPeticion({ offset, limit, order, orderType });
    
    if (datos) {
      renderizarTablaSolicitudesCompra(datos.solicitudes);
    } else {
      paginador.resetCantidadPaginadores();
      crearFilaMensajeDeTablaSolicitudesCompra("NO HAY SOLICITUDES DE COMPRA PENDIENTES");
    }

    paginador.actualizarPaginador();
  }
}

async function enviarPeticion({ offset, limit, order, orderType }) {
  let url = `/lotes/solicitudes-compra`;

  const queryParams = formarQueryParams({ offset, limit, order, orderType });
  if (queryParams) url += `?${queryParams}`;

  return await enviarGET(url);
}

function formarQueryParams({ offset, limit, order, orderType }) {
  const op = [];

  if (offset || limit || order || orderType) {
    if (offset && offset >= 0) op.push(`offset=${offset}`);
    if (limit) op.push(`limit=${limit}`);
    if (order) op.push(`order=${order}`);
    if (orderType) op.push(`orderType=${orderType}`);
  }

  return op.join("&");
}

function obtenerOpcionesDeConsulta(paginador) {
  const cantResults = getElementById("cantidad-resultados").value;
  const orden = getElementById("orden").value;
  const tipoOrden = getElementById("tipo-orden").value;

  const order = orden !== "" ? orden : null;
  const orderType = tipoOrden !== "" ? tipoOrden : null;

  if (cantResults !== "") paginador.resultadosPorPagina = +cantResults;

  return { order, orderType };
}