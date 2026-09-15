// SUSTITUIDO POR CALCTREE. NO BORRAR COMPONENTE 
// POR SI SE RECUPERA ENFOQUE GRID/FLEX EN LAYOUT A FUTURO

export function NivelGeneracional ({layout, personas, children}) {

    return (
        <>
            <section className="flex justify-evenly items-start p-10">
                { personas.map(p => children(p) )}
            </section>
        </>
    )
}