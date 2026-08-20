export function NivelGeneracional ({persona, personas, generacion}) {

    const filaImprimir;

    if (generacion === generacionEgo) filaImprimir = getHermanos({persona}, personas);
    if (generacion === generacionP1) {
        const tios {tiosPaternos, tiosMaternos} = getTios({persona}, personas);
        const padres {padre, madre} = getPadres({persona}, personas);

        forEach.tiosPaternos( p => filaImprimir.push(p));
        filaImprimir.push(padre).push(madre);
        forEach.tiosMaternos( p => filaImprimir.push(p));
    }
    if (generacion === generacion)
    


    return ( 
        
    )
}