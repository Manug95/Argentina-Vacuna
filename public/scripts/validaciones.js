import { agregarClases, removerClases, getElementById } from "./frontUtils.js";

export function setValidInputStyle(id) {
  const input = getElementById(id);
  removerClases(input, "is-invalid");
  agregarClases(input, "is-valid");
}

export function setInvalidInputStyle(id) {
  const input = getElementById(id);
  removerClases(input, "is-valid");
  agregarClases(input, "is-invalid");
}

export function validarFormSelect(value) {
  if (value === "") {
    return false;
  }
  return true;
}