export function NivelGeneracional ({personas, children}) {
    
    return (
        <>
            <section className="flex justify-evenly gap-4 px-10 my-10">
                { personas.map(p => children(p) )}
            </section>
        </>
    )
}