export function NivelGeneracional ({listadoFamiliar, children}) {

    const layoutsPorGeneracion = { // TO DO: CONSTRUIR LAYOUT PARA CADA GENERACION EN COMPONENTES SEPARADOS
        Ego: <LayoutEgo/>,
        P1: <LayoutP1/>,
        P2: <LayoutP2/>
    }

    for (const generacion of listadoFamiliar) {

        const layout = layoutsPorGeneracion[generacion.entry]

    }

    const generacion = personas.entry;

    

     const layout = layoutsPorGeneracion[generacion];

    return (
        <>
            <section className="flex justify-evenly items-start p-10">
                { personas.map(p => children(p) )}
            </section>
        </>
    )
}


/* LUEGO, AL RECIBIR LA GENERACIÓN, SE RENDERIZARÁ EL LAYOUT CORRECTO 
const layoutsPorGeneracion = {
  Ego: LayoutEgo
  P1: LayoutP1,
  P2: LayoutP2,
}*/