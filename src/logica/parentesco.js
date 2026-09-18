import { getPadres, getHermanos, getTios, getAbuelos } from './familyUtilities.js'

export default function getParentescoMainId(personaInicialId, personas){

    if (!personas || !personaInicialId) return [];

    //obtenemos la personaInicial a partir del ID
    const personaInicial = personas.find(p => p.id === personaInicialId) ?? null;
    if (!personaInicial) return [];

    // Creamos copias
    const copiaPersonas = structuredClone(personas);
    const copiaPersonaInicial = structuredClone(personaInicial);

    // ----- ego -----
    const ego = [{id: copiaPersonaInicial.id, parentesco: "ego", sexo: copiaPersonaInicial.sexo}];
    /*const listadoHermanos = getHermanos(copiaPersonaInicial, copiaPersonas);
    listadoHermanos.push(copiaPersonaInicial);
    const hermanos = listadoHermanos
        .filter( p => p!= null)
        .map( p => ({
            id: p.id,
            parentesco: "ego"
    }));*/

    // ----- Primera generacion ascendente (padres y tios) ------
    const {padre, madre} = getPadres(copiaPersonaInicial, copiaPersonas);
    const padres = [
        padre && {id: padre.id, parentesco: "paterno", sexo: padre.sexo},
        madre && {id: madre.id, parentesco: "materno", sexo: madre.sexo}
    ].filter(Boolean);

    const {tiosPaternos, tiosMaternos} = getTios(copiaPersonaInicial, copiaPersonas);
    const tios = [
        ...tiosPaternos.filter(p => p != null).map(p => ({ id: p.id, parentesco: "paterno", sexo: p.sexo })),
        ...tiosMaternos.filter(p => p != null).map(p => ({id: p.id, parentesco: "materno", sexo: p.sexo}))
    ];

    // ------ segunda generacion ascendente (abuelos) --------
    const {
        abueloPaterno, 
        abuelaPaterna, 
        abueloMaterno, 
        abuelaMaterna
    } = getAbuelos(copiaPersonaInicial, copiaPersonas);

    const abuelos = [
        abueloPaterno && {id: abueloPaterno.id, parentesco: "abuelosPaternos", sexo: abueloPaterno.sexo},
        abuelaPaterna && {id: abuelaPaterna.id, parentesco: "abuelosPaternos", sexo: abuelaPaterna.sexo},
        abueloMaterno && {id: abueloMaterno.id, parentesco: "abuelosMaternos", sexo: abueloMaterno.sexo},
        abuelaMaterna && {id: abuelaMaterna.id, parentesco: "abuelosMaternos", sexo: abuelaMaterna.sexo}
    ].filter(Boolean);

    // ------ tercera generacion ascendente (bis-abuelos) ------
    
    const bisabuelosPaternos = Object.values(getAbuelos(padre, copiaPersonas))
                                .filter( p => p != null)
                                .map(p => ({
                                    id: p.id,
                                    parentesco: "paterno",
                                    sexo: p.sexo
                                }));

    const bisabuelosMaternos = Object.values(getAbuelos(madre, copiaPersonas))
                                .filter( p => p != null)
                                .map(p => ({
                                    id: p.id,
                                    parentesco: "materno",
                                    seox: p.sexo
                                }));

    const bisabuelos = [...bisabuelosPaternos, ...bisabuelosMaternos];
    
    // ------ primera generacion descendente (hijos) ------
    
    const listadoHijos = personaInicial.hijosIds.map ( h => copiaPersonas
                        .find( p => h === p.id))
                        .filter(p => p != null);

    const hijos = listadoHijos.map( h => ({
                            id: h.id,
                            parentesco: "hijos",
                            sexo: h.sexo
                        }));

    // ------ segunda generacion descendente (nietos) ------

    const nietos = listadoHijos.flatMap(h => h.hijosIds
                                        .map(hijoId => copiaPersonas.find(cp => hijoId === cp.id))
                                        .filter(p => p != null)
                                        .map ( nieto => ({
                                            id: nieto.id,
                                            parentesco: "nietos",
                                            sexo: nieto.sexo
                                        })));

    return [...ego, ...padres, ...tios, ...abuelos, ...bisabuelos, ...hijos, ...nietos];
};