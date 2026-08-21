export function ArbolGenealogico ({ listadoFamiliar, children }) {

    // listadoFamiliar = [ [genP2], [genP1], [genEgo] ]
    
    const listadoFamiliarFormateado = {
        ego: listadoFamiliar.ego,
        p1: Object.values(listadoFamiliar.p1),
        p2: Object.values(listadoFamiliar.p2)
    };




    return (
        <>
            <header className={`h-40`}>sdasdasd</header>
            <main className="w-[1200px] h-[80%] mt-10  grid grid-rows-3 items-center ">
                {Object.values(listadoFamiliarFormateado).map( personas => children (personas) ) }
            </main>
        </>
    )
}