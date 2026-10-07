import calcularEdad from './calcularEdad.js';

export function getPadres (persona, personas) {

    if (!persona) return { padre:null, madre:null };

    const padre= personas.find (p => p.id === persona.padreId) ?? null;
    const madre= personas.find (p => p.id === persona.madreId) ?? null; 

    return {padre, madre} ; 
}
export function obtenerFechaOrdenable (individuo) {
    new Date(individuo.fechaNacimiento ?? "3000-01-01")
};

export function getHermanos (persona, personas) {

    if (!persona) return [];

    const {padre, madre} = getPadres(persona, personas);
    // Unificamos Ids de los hermanos evitando duplicaciones
    const hermanosIds = new Set( [...(padre?.hijosIds ?? []), ...(madre?.hijosIds ?? []) ] );
    //Early return si no tiene hermanos
    if (hermanosIds.size === 0 ) return [];

    const hermanos = Array.from(hermanosIds)
                    .map( id => personas.find( p => p.id === id))
                    .filter (p => p && p.id !== persona.id);

    // Ordenamos de mayor a menor. 
    // Si fechaNacimiento = {} --> menor.
    const obtenerFechaOrdenable = (individuo) => new Date(individuo.fechaNacimiento ?? "3000-01-01");
    hermanos.sort( (a,b) => obtenerFechaOrdenable(a) - obtenerFechaOrdenable(b) );

    return hermanos;
}

export function getAbuelos (persona, personas) {

    if (!persona) return { abueloPaterno: null, abuelaPaterna: null, abueloMaterno: null, abuelaMaterna: null }

    const {padre, madre} = getPadres(persona, personas);

    const abueloPaterno = personas.find ( p => p.id === padre?.padreId) ?? null;
    const abuelaPaterna = personas.find ( p => p.id === padre?.madreId) ?? null;
    const abueloMaterno = personas.find ( p => p.id === madre?.padreId) ?? null;
    const abuelaMaterna = personas.find ( p => p.id === madre?.madreId) ?? null;

    return {abueloPaterno, abuelaPaterna, abueloMaterno, abuelaMaterna}
}

export function getTios (persona, personas) {

    if (!persona) return { tiosPaternos: [], tiosMaternos: []}

    const { padre, madre } = getPadres(persona, personas);

    const tiosPaternos = getHermanos(padre, personas);
    const tiosMaternos =  getHermanos(madre, personas);

    return { tiosPaternos, tiosMaternos };
};

export function getHijos (persona, personas) {
    if (!persona || !personas) return [];
    const hijos = persona.hijosIds
        .map(id => personas.find( p => p.id === id))
        .filter(Boolean);
        // ordenación mayor a menor
    hijos.sort((a,b) => calcularEdad(b.fechaNacimiento, b.fechaDefuncion) - calcularEdad(a.fechaNacimiento, a.fechaDefuncion));

    return hijos;
};