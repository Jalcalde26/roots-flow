export function ArbolGenealogico ({ listadoFamiliar, children }) {

    return (
        <>
            <header className={`h-40`}>sdasdasd</header>
            <main className="w-[1200px] h-[80%] mt-10  grid grid-rows-3 items-center ">
                {Object.values(listadoFamiliar).map( personas => children (personas) ) }
            </main>
        </>
    )
}

/* <ArbolGenealogico
        listadoFamiliar = {listadoFamiliarFormateado}
        children={(personas) => (
            <NivelGeneracional
                key ={personas[0].generacion}
                personas = {personas}
                children = {(persona) => (
                        <IndividualCard
                            key = {persona.id}
                            persona = {persona}
                            generacion = {persona.generacion}
                            pariente = {persona.pariente}
                        />
                        )}
            />
        )}
/> */