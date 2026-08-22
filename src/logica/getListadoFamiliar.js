import { getPadres, getHermanos, getTios, getAbuelos } from '../logica/familyUtilities.js'


export default function getListadoFamiliar(personaInicialId, personas){

    if (!personas || !personaInicialId) return {ego: null, p1: null, p2: null};

    //obtenemos la personaInicial a partir del ID
    const personaInicial = personas.find(p => p.id === personaInicialId) ?? null;

    if (!personaInicial) return {ego: null, p1: null, p2: null};

    // Creamos copias
    const copiaPersonas = structuredClone(personas);
    const copiaPersonaInicial = structuredClone(personaInicial);

    // ----- EGO -----
    const ego = getHermanos(copiaPersonaInicial, copiaPersonas);
    ego.push(copiaPersonaInicial);
    ego.forEach( p => p.generacion = "ego");

    // ----- P1 ------
    const {padre, madre} = getPadres(copiaPersonaInicial, copiaPersonas);

    if (padre) {
        padre.pariente = "padre";
        padre.generacion = "p1";
    };
    if(madre) {
        madre.pariente = "madre";
        madre.generacion = "p1";
    };

    const {tiosPaternos, tiosMaternos} = getTios(copiaPersonaInicial, copiaPersonas);
    tiosPaternos.forEach ( p => {
        p.pariente = "padre";
        p.generacion = "p1";
    });
    tiosMaternos.forEach ( p=> {
        p.pariente = "madre";
        p.generacion = "p1";
    });

    const p1 = {
        tiosPaternos: tiosPaternos ?? [],
        padre: [padre].filter(Boolean),
        madre: [madre].filter(Boolean),
        tiosMaternos: tiosMaternos ?? []
    };

    // ------ P3 --------
    const {
        abueloPaterno, 
        abuelaPaterna, 
        abueloMaterno, 
        abuelaMaterna
    } = getAbuelos(copiaPersonaInicial, copiaPersonas);


    [abueloPaterno, abuelaPaterna].filter(Boolean).forEach( p => {p.pariente = "padre"; p.generacion = "p2";});
    [abueloMaterno, abuelaMaterna].filter(Boolean).forEach( p => {p.pariente = "madre"; p.generacion = "p2";});
    
    const p2 = {
        abuelosPaternos:[abueloPaterno, abuelaPaterna].filter(Boolean),
        abuelosMaternos:[abueloMaterno, abuelaMaterna].filter(Boolean)
    };

    return {
        p2,
        p1,
        ego
    };
}


/* listadoFamiliar = {
            ego: [{} , {}, {}], 
            p1: {
                    padre:[{}],
                    madre: [{}],
                    tiosPaternos: [{}],
                    tiosMaternos: [{}]
                },
            p2: {
                    abuelosPaternos: [{}, {}],
                    abuelosMaternos: [{}, {}]
                }
        }
*/

/*
listadoFamiliarFormateado = {
            ego: [],
            p1: [[],[],[],[]],
            p2: [[],[]], [[],[]]
}
*/

/*
Object.values(listadoFamiliarFormateado) = [ [], [ [[],[],[],[]] ], [[],[]], [[],[]] ]



*/