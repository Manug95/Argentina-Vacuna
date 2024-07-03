export default class Utils {
  static formatearFecha(fecha) {
    return fecha.toISOString().split("T")[0].split("-").reverse().join("-");
  }

  static crearOpcionesDeListado({ orden, dir, offset, limit }) {
    // orden: "tipo", "fecha", "cantidad", "estado"
    const opciones = {};
  
    // opciones.attributes = { exclude: ['estado'] },
  
    opciones.include = [
      {
        model: TipoVacuna,
        required: true
      }
    ];
  
    opciones.where = {
      estado: "PENDIENTE"
    };
  
    if (orden) {
      opciones.order = [this.calcularElOrdenDelListadoDeSolicitudes(orden, dir)];
    }
  
    if (offset) {
      opciones.offset = offset;
    }
  
    if (limit) {
      opciones.limit = limit;
    }
  
    return opciones;
  }

  static calcularElOrdenDelListadoDeSolicitudes(order, direccion) {
    const orden = [];
  
    if (order === "tipo") {
      orden.push(...[TipoVacuna, "tipo", direccion]);
    }
  
    if (order === "fecha") {
      orden.push(...["fechaSolicitud", direccion]);
    }
  
    if (order === "cantidad") {
      orden.push(...["cantidad", direccion]);
    }
  
    if (order === "estado") {
      orden.push(...["estado", direccion]);
    }
  
    return orden;
  }
}