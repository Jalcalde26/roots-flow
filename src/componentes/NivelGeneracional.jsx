export function NivelGeneracional ({layout, personas, children}) {

    return (
        <>
            <section className="flex justify-evenly items-start p-10">
                { personas.map(p => children(p) )}
            </section>
        </>
    )
}