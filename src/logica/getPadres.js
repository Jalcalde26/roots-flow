export function getPadres (persona, personas) {

    const padre= personas.find( p => p.id === persona.padreId) ;
    const madre= personas.find (p => p.id === persona.madreId ); 

    return {padre, madre} ; 
}

export function getHermanos (persona, personas) {

const {padre, madre} = getPadres(persona, personas);
// Unificamos Ids de los hermanos evitando duplicaciones
const hermanosIds = new Set( [...(padre?.hijosIds ?? []), ...(madre?.hijosIds ?? []) ] );
//Early return si no tiene hermanos
if (hermanosIds.size === 0 ) return [];

const hermanos = Array.from(hermanosIds)
                .map( id => personas.find( p => p.id === id))
                .filter (p => p && p.id !== persona.id);

// Ordenamos de mayor a menor. 
// Si fechaNcimiento = null --> menor.
const obtenerFechaOrdenable = (individuo) => new Date(individuo.fechaNacimiento ?? "3000-01-01");
hermanos.sort( (a,b) => obtenerFechaOrdenable(a) - obtenerFechaOrdenable(b) );

return hermanos;
}