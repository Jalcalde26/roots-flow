export function ArbolGenealogico ({ listadoFamiliar, children }) {

    // listadoFamiliar = [ [genP2], [genP1], [genEgo] ]
    // en app.jsx al calcular las generaciones se añadira la prop pariente y generacion a cada miembro, extrayendo de ahí para IndividualCard

    return (
        <>
            <main className="w-100 mt-10 max-w-[1200px] flex flex-column">
                { listadoFamiliar.forEach( personas => children (personas) ) }
            </main>
        </>
    )
}                       <NivelGeneracional
                            personas = {personas}
                            children = {(persona) => (
                                    <IndividualCard
                                    persona = {persona}
                                    generacion = {persona.generacion}
                                    pariente = {persona.pariente}
                                    />
                                )}
                        />