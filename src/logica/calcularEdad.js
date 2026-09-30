import esFechaValida from './esFechaValida.js'

function calcularEdad(fechaNacimiento, fechaDefuncion) {
    if (!esFechaValida(fechaNacimiento)) return false;

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const fallecimiento = new Date(fechaDefuncion);

    let edad = 0;
    let mes = 0;

    if (fechaDefuncion === null) {
        edad = hoy.getFullYear() - nacimiento.getFullYear();
        mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fallecimiento.getDate() < nacimiento.getDate())) edad--;
    } else {
        edad = fallecimiento.getFullYear() - nacimiento.getFullYear();
        mes = fallecimiento.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    };
    
    return edad;
}

export default calcularEdad;

export function calcularMascotaEdad(mascota) {
    if (mascota) return calcularEdad(mascota.fechaNacimiento, mascota.fechaDefuncion);
    return null;
};
