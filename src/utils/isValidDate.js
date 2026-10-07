function isValidDate(dateValue) {
    // Reglas de nomemclatura base datos:
    // Fecha de nacimiento desconocido = "undefined" o null;
    // Fecha de fallecimiento (está vivo) = null;
    // Fecha de fallacimiento desconocido (está muerto) = "undefined";
    if (dateValue === null|| dateValue === undefined || dateValue === "" || dateValue === "undefined") return false;

    const date = new Date(dateValue);

    return !Number.isNaN(date.getTime());
}

export default isValidDate;