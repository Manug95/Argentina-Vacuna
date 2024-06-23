import { enviarPOST } from "./httpRequests.js";
import { getElementById } from "./frontUtils.js";
import { setInvalidInputStyle, setValidInputStyle } from "./validaciones.js";

document.addEventListener("DOMContentLoaded", (e) => {
  getElementById("comprar-lote-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formValues = getFormValues();
    
    if (validarFormulario(formValues)) {
      enviar(formValues);
    }

  });
});

async function enviar(formValues) {
  await enviarPOST("/lotes/nuevo", formValues);
}

function getFormValues() {
  return {
    vacuna: getFormInputValue("vacuna"),
    cantidad: getFormInputValue("cantidad"),
    deposito: getFormInputValue("deposito-nacional")
  };
}

function getFormInputValue(id) {
  return getElementById(id).value;
}

function validarFormulario(values) {
  let isValid = true;

  if (!validarFormSelect(values.vacuna)) {
    setInvalidInputStyle("vacuna");
    isValid = isValid && false;
  } else {
    setValidInputStyle("vacuna");
    isValid = isValid && true;
  }

  if (!validarFormSelect(values.deposito)) {
    setInvalidInputStyle("deposito-nacional");
    isValid = isValid && false;
  } else {
    setValidInputStyle("deposito-nacional");
    isValid = isValid && true;
  }

  if (!validarFormSelect(values.cantidad)) {
    setInvalidInputStyle("cantidad");
    isValid = isValid && false;
  } else {
    setValidInputStyle("cantidad");
    isValid = isValid && true;
  }

  return isValid;
}

function validarFormSelect(value) {
  if (value === "") {
    return false;
  }
  return true;
}