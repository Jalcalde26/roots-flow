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