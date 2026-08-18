export function getPadres ({persona}, personas) {

    if (!persona) return { padre:undefined, madre:undefined };

    const padre= personas.find( p => p.id === persona.padreId) ;
    const madre= personas.find (p => p.id === persona.madreId ); 

    return {padre, madre} ; 
}

export function getHermanos ({persona}, personas) {

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
    // Si fechaNcimiento = {} --> menor.
    const obtenerFechaOrdenable = (individuo) => new Date(individuo.fechaNacimiento ?? "3000-01-01");
    hermanos.sort( (a,b) => obtenerFechaOrdenable(a) - obtenerFechaOrdenable(b) );

return hermanos;
}

export function getAbuelos ({persona}, personas) {

    if (!persona) return { abueloPaterno: undefined, abuelaPaterna: undefined, abueloMaterno: undefined, abuelaMaterna: undefined }

    const {padre, madre} = getPadres(persona, personas);

    const abueloPaterno = personas.find ( p => p.id === padre?.padreId);
    const abuelaPaterna = personas.find ( p => p.id === padre?.madreId);
    const abueloMaterno = personas.find ( p => p.id === madre?.padreId);
    const abuelaMaterna = personas.find ( p => p.id === madre?.madreId);

    return {abueloPaterno, abuelaPaterna, abueloMaterno, abuelaMaterna}
}

export function getTios ({persona}, personas) {

    if (!persona) return { tiosPaternos: undefined, tiosMaternos: undefined}

    const { padre, madre } = getPadres(persona, personas);

    const tiosPaternos = getHermanos(padre, personas);
    const tiosMaternos =  getHermanos(madre, personas);

    return { tiosPaternos, tiosMaternos };
}