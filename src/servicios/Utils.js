export default class Utils {
  static formatearFecha(fecha) {
    return fecha.toISOString().split("T")[0].split("-").reverse().join("-");
  }
}