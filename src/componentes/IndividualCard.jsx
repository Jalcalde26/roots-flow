import {NacimientoIcon} from "../assets/icons/NacimientoIcon.jsx";
import DefuncionIcon from "../assets/icons/DefuncionIcon.jsx";
import LugarNacimientoIcon from "../assets/icons/LugarNacimientoIcon.jsx";
import fechaFormateada from "../logica/fechaFormateada.js";

export function IndividualCard ({persona, generacion, pariente}) {

    if (!persona) return null;
    
    const formaAvatar = persona.sexo === `m` ? `rounded-full` : `rounded-md`;
    const formaAnillo = persona.sexo === `m` ? `before:rounded-full` : `before:rounded-lg`;
    const avatar = persona.fotografia ?? 'personas/avatar-prueba.png';
    const hasAnyData = persona.fechaNacimiento || persona.fechaDefuncion || persona.lugarNacimiento;
    
    function getColorGeneracion (generacion, pariente) {
        
        if (!generacion) return "transparent";
        if (generacion === "generacionEgo") return "#9B79BD"
        

        const coloresAnillos = {
            generacionF2: {padre:"#B8A2F8", madre:"#E8C2FB"},
            generacionF1: {padre:"#9176EB", madre:"#D292F3"},
            generacionP1: {padre:"#3B82F6", madre:"#FB7185"},
            generacionP2: {padre:"#2D52B8", madre:"#B5325E"},
            generacionP3: {padre:"#4A70E2", madre:"#E85A83"},
        }
    
        return coloresAnillos[generacion]?.[pariente] ?? "transparent";
    }

    return (
        <>            
            <article className = {`relative min-w-68 flex flex-col items-center gap-4 z-5 pt-12 pb-6 px-8  bg-[#f6f4e8] rounded-lg shadow-md hover:shadow-lg transition-shadow group`}>
                <h2 className = {`z-10 text-center leading-[0.8] flex-col text-3xl font-semibold text-[#31322E]`}>{persona.nombre}<br />
                    <span className={'text-[#094C8A]  font-normal text-xl border-slate-700 pr-1'}>{(persona.apellidopadre ?? '').toUpperCase()}</span>
                    <span className={`text-[#C3891F] font-normal text-xl pl-1`}>{(persona.apellidomadre ?? '').toUpperCase()}</span>
                </h2>
                <div className= {`z-10 absolute left-1/2 -translate-x-1/2 -top-14 w-22 h-22 ${formaAvatar} overflow-hidden transition-transform group-hover:scale-115 duration-300 group`}>
                    <img className={`object-cover w-full h-full`} src={avatar} alt={`fotografía de ${persona.nombre} ${persona.apellidopadre} ${persona.apellidomadre}`}></img>
                </div>
                <div className= {`absolute left-1/2 -translate-x-1/2 -top-14 w-22 min-h-22 rounded-full
                            before:content-['']
                            before:absolute
                            before:-inset-0.5
                            ${formaAnillo}
                            before:border-2
                            before:border-[var(--color-anillo)]
                            before:shadow-md
                            before:transition-transform 
                            before:duration-300 
                            group-hover:before:scale-120
                            before:pointer-events-none`}
                            style={{ '--color-anillo': getColorGeneracion(generacion, pariente) }}
                            > </div>
                {hasAnyData &&(
                <dl className={"w-full text-xs text-slate-700 border rounded-lg border-slate-300 px-1"}>
                    {/* Fecha Nacimiento */}
                    {persona.fechaNacimiento &&(
                    <div className={"flex items-center justify-between border-b border-slate-300 p-1"}>
                        <dt className={`flex items-center gap-1`}>
                            <NacimientoIcon className={`w-3 h-3`}/> Fecha de nacimiento: 
                        </dt>
                        <dd>
                            {fechaFormateada(persona.fechaNacimiento)}
                        </dd>
                    </div>
                    )}
                    {/* Fecha Defuncion (si existe) */}
                    {persona.fechaDefuncion && (
                    <div className={"flex items-center justify-between border-b border-slate-300 p-1"}>

                        <dt className={`flex items-center gap-1`}>
                            <DefuncionIcon className={`w-3 h-3`} />
                            Fecha de defunción:
                        </dt>
                        <dd>
                                {fechaFormateada(persona.fechaDefuncion)}
                        </dd>
                    </div>
                    )}
                    {/* Lugar de Nacimiento */}
                    {persona.lugarNacimiento &&(
                    <div className={"flex items-center justify-between p-1 gap-1"}>
                        <dt className={`flex items-center gap-1`}>
                            <LugarNacimientoIcon className={`w-3 h-3`}/>
                            Lugar de nacimiento:
                        </dt>
                        <dd>
                            {persona.lugarNacimiento}
                        </dd>
                    </div>
                        )}
                </dl>
                )}
            </article>
        </>
    )
}

