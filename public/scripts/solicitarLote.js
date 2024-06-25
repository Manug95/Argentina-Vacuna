import { enviarPOST, enviarGET } from "./httpRequests.js";
import { getElementById, getFormInputValue, createElement, mostrarPregunta, mostrarMensaje } from "./frontUtils.js";
import { setInvalidInputStyle, setValidInputStyle, validarFormSelect } from "./validaciones.js";

document.addEventListener("DOMContentLoaded", (e) => {
  [...document.getElementsByTagName("select")].forEach(s => {
    s.addEventListener("change", () => setValidInputStyle(s.id));
  });

  getElementById("solicitar-lote-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formValues = getFormValues();
    
    if (validarFormulario(formValues)) {
      enviar(formValues);
    }

  });

  // getElementById("cantidad").addEventListener("change", comprobarDisponibilidadVacunas);

  // getElementById("vacuna").addEventListener("change", comprobarDisponibilidadVacunas);

  // getElementById("btn-si").addEventListener("click", async () => {
  //   const selectVacuna = getElementById("vacuna");
  //   const idTipoVacuna = selectVacuna.value;

  //   try {
  //     const res = await enviarPOST(`/lotes/solicitar/nacion/${idTipoVacuna}`);
  //     mostrarMensaje(true, "Solicitud enviada");
  //   } catch (e) {
  //     mostrarMensaje(false, "No se pudo enviar la solicitud");
  //   }
  // });

});

// async function comprobarDisponibilidadVacunas() {
//   const selectVacuna = getElementById("vacuna");
//   const idTipoVacuna = selectVacuna.value;
//   const cantidad = getElementById("cantidad").value;

//   if (idTipoVacuna && cantidad) {
//     const res = await enviarGET(`/lotes/solicitar/nacion/${idTipoVacuna}?cantidad=${cantidad}`);
//     const depositosNac = res.body;

//     const select = getElementById("deposito-nacional");
//     select.replaceChildren(null);
//     select.appendChild(createElement(
//       "option",
//       { 
//         value: "", 
//         content: depositosNac.length > 0 ? "Seleccionar deposito nacional" : "No hay stock de esta vacuna",
//         disabled: true,
//         selected: true
//       }
//     ));
    
//     if (depositosNac.length > 0) {
//       depositosNac.forEach(d => {
//         select.appendChild(createElement("option", { value: d.id, content: d.nombre }));
//       });
//     } else {
//       mostrarPregunta(`No hay stock de la vacuna ${selectVacuna.selectedOptions[0].textContent} ¿Desea Solicitar la compra de esta vacuna?`);
//     }
//   }
// }

async function enviar(formValues) {
  await enviarPOST("/lotes/solicitar/nacion", formValues);
}

function getFormValues() {
  return {
    tipoVacuna: getFormInputValue("vacuna"),
    cantidad: getFormInputValue("cantidad"),
    // depositoNac: getFormInputValue("deposito-nacional"),
    depositoProv: getFormInputValue("deposito-provincial")
  };
}

function validarFormulario(values) {
  let isValid = true;

  if (!validarFormSelect(values.tipoVacuna)) {
    setInvalidInputStyle("vacuna");
    isValid = isValid && false;
  } else {
    setValidInputStyle("vacuna");
    isValid = isValid && true;
  }

  // if (!validarFormSelect(values.depositoNac)) {
  //   setInvalidInputStyle("deposito-nacional");
  //   isValid = isValid && false;
  // } else {
  //   setValidInputStyle("deposito-nacional");
  //   isValid = isValid && true;
  // }

  if (!validarFormSelect(values.depositoProv)) {
    setInvalidInputStyle("deposito-provincial");
    isValid = isValid && false;
  } else {
    setValidInputStyle("deposito-provincial");
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