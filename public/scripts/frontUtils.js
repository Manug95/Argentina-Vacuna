/**
 * Funcion manejadora que impide que se pude escribir un espacio en un input
 * @param {Event} event El evento que desato la funcion
 */
function bloquearEspacios(event) {
  if (event.key === " ") {
    event.preventDefault();
  }
}



/**
 * Oculta un elemento
 * @param {String} id id del elemento que se desa¿ea ocultar
 */
function ocultarElemento(id) {
  agregarClases(getElementById(id), "d-none");
}



/**
 * Muestra un elemento que esta oculto
 * @param {String} id id del elemento que se desa¿ea mostrar
 */
function mostrarElemento(id) {
  removerClases(getElementById(id), "d-none")
}



/**
 * Recupera un elemento HTML del DOM por su ID
 * @param {String} id La id del elemento a recuperar
 * @returns {HTMLElement} El elemento HTML recurado
 */
function getElementById(id) {
  return document.getElementById(id);
}



/**
 * retorna la cantidad de elementos hijos que tiene un elemento html
 * @param {String} id del elemento que se quiere contar sus hijos
 * @returns {Number} la cantidad de hijos del elemento
 */
function cantidadHijosDeUnElemento(id) {

  return getElementById(id).childElementCount;

}



/**
 * Abre un modal mostrando un mensaje con el estado de la peticion al servidor
 * @param {Boolean} ok Booleano que indica si la peticion fue exitosa o no
 * @param {*} mensaje El mensaje de exito o no de la peticion que contiene la respuesta
 */
function mostrarMensaje(ok, mensaje) {
  const myModal = new bootstrap.Modal(getElementById('modal-mensaje'), {});
  if (ok) {
    mensajeExito(mensaje);
    myModal.show();
  }
  else {
    mensajeError(mensaje);
    myModal.show();
  }
}



/**
 * 
 * @param {String} mensaje Es el mensaje a mostrar en el modal
 */
function mensajeError(mensaje) {
  const cartel = getElementById("mensaje");

  // quitarClaseSuccess(cartel);
  // agregarClaseDanger(cartel);

  removerClases(cartel, "text-success");
  agregarClases(cartel, "text-danger");

  cartel.innerHTML = mensaje;
}



/**
 * 
 * @param {String} mensaje Es el mensaje a mostrar en el modal
 */
function mensajeExito(mensaje) {
  const cartel = getElementById("mensaje");

  // quitarClaseDanger(cartel);
  // agregarClaseSuccess(cartel);

  removerClases(cartel, "text-danger");
  agregarClases(cartel, "text-success");

  cartel.innerHTML = mensaje;
}



/**
 * @param {HTMLElement} el el elemento del dom a agregarle las clases
 * @param  {...string} clases las clases a agregar
 */
function agregarClases(el, ...clases) {
  el.classList.add(...clases);
}



/**
 * @param {HTMLElement} el el elemento del dom a removerle las clases
 * @param  {...string} clases las clases a remover
 */
function removerClases(el, ...clases) {
  el.classList.remove(...clases);
}



/**
 * Recarga la pagina si el recurso se borro con exito
 */
function recargar() {

  if (getElementById("mensaje").classList.contains("text-success")) {
    window.location.reload();
  }
  
}



/**
 * Captura el campo hidden del formulario de editar y devuelve su valor
 * @returns {String} Devuelve la id de la instancia del recurso
 */
function obtenerIdDelCampoHidden() {
  return document.querySelector('[type="hidden"]').value;
}



export {
  ocultarElemento,
  mostrarElemento,
  agregarClases,
  removerClases,
  cantidadHijosDeUnElemento,
  getElementById,
  bloquearEspacios,
  mostrarMensaje,
  recargar,
  obtenerIdDelCampoHidden
}