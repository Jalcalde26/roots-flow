export function ArbolGenealogico ({ listadoFamiliar, children }) {

    // listadoFamiliar = [ [genP2], [genP1], [genEgo] ]
    // en app.jsx al calcular las generaciones se añadira la prop pariente y generacion a cada miembro, extrayendo de ahí para IndividualCard

    return (
        <>
            <header className={`h-40`}>sdasdasd</header>
            <main className="w-[1200px] h-[80%] mt-10  grid grid-rows-3 items-center ">
                { listadoFamiliar.map( personas => children (personas) ) }
            </main>
        </>
    )
}