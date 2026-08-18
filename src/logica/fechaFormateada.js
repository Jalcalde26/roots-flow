export default function fechaFormateada (fechaISO) {
        return fechaISO.split('-').reverse().join('-');
    }