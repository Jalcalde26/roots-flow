function esFechaValida(fecha) {
    // Reglas de nomemclatura base datos:
    // Fecha de nacimiento desconocido = "undefined" o null;
    // Fecha de fallecimiento (está vivo) = null;
    // Fecha de fallacimiento desconocido (está muerto) = "undefined";
    if (fecha === null|| fecha === undefined || fecha === "" || fecha === "undefined") return false;

    const date = new Date(fecha);

    return !Number.isNaN(date.getTime());
}

export default esFechaValida;