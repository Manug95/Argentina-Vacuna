import { mostrarMensaje } from "./frontUtils.js";

const optionsPOST = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  }
}

const optionsDELETE = {
  method: "DELETE",
}

const optionsPUT = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  }
}

const optionsPATCH = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  }
}



/**
 * Realiza la peticion GET al servidor
 * @param {String} url La url a donde se enviaran los datos de la peticion
 */
async function enviarGET(url) {

  const respuesta = await fetch(url);
  const datosRespuesta = await respuesta.json();
  return datosRespuesta;

}



/**
 * Realiza la peticion POST al servidor
 * @param {String} url La url a donde se enviaran los datos de la peticion
 * @param {Object} datos Objeto con los datos a enviar en la peticion
 */
async function enviarPOST(url, datos) {

  optionsPOST.body = JSON.stringify(datos);

  const respuesta = await fetch(url, optionsPOST);
  const datosRespuesta = await respuesta.json();

  mostrarMensaje(datosRespuesta.ok, datosRespuesta.mensaje);

}



/**
 * Realiza la peticion DELETE al servidor
 * @param {String} url La url, con la id del registro a borrar, a donde se enviara la peticion
 */
async function enviarDELETE(url) {

  const respuesta = await fetch(url, optionsDELETE);
  const datosRespuesta = await respuesta.json();

  mostrarMensaje(datosRespuesta.ok, datosRespuesta.mensaje);

}



/**
 * Realiza la peticion PUT al servidor
 * @param {String} url La url a donde se enviaran los datos de la peticion
 * @param {Object} datos Objeto con los datos a enviar en la peticion
 */
async function enviarPUT(url, datos) {

  optionsPUT.body = JSON.stringify(datos);

  const respuesta = await fetch(url, optionsPUT);
  const datosRespuesta = await respuesta.json();

  mostrarMensaje(datosRespuesta.ok, datosRespuesta.mensaje);

}



/**
 * Realiza la peticion PATCH al servidor
 * @param {String} url La url a donde se enviaran los datos de la peticion
 * @param {Object} datos Objeto con los datos a enviar en la peticion
 */
async function enviarPATCH(url, datos) {

  optionsPUT.body = JSON.stringify(datos);

  const respuesta = await fetch(url, optionsPATCH);
  const datosRespuesta = await respuesta.json();

  mostrarMensaje(datosRespuesta.ok, datosRespuesta.mensaje);

}



export {
  enviarGET,
  enviarPOST,
  enviarDELETE,
  enviarPUT,
  enviarPATCH
}