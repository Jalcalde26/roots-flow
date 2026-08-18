import {NacimientoIcon} from "../assets/icons/NacimientoIcon.jsx";
import DefuncionIcon from "../assets/icons/DefuncionIcon.jsx";
import LugarNacimientoIcon from "../assets/icons/LugarNacimientoIcon.jsx";

export function IndividualCard ({persona}, herencia) {

    if (!persona) return null;
    
    const formaAvatar = persona.sexo === `m` ? `rounded-full` : `rounded-md`;
    const formaAnillo = persona.sexo === `m` ? `before:rounded-full` : `before:rounded-lg`;
    const avatar = persona.fotografia ?? 'personas/avatar-prueba.png';
    const hasAnyData = persona.fechaNacimiento || persona.fechaDefuncion || persona.lugarNacimiento;
    /* TODO: construir clases colores avatar dependiendo herencia*/

    return (
        <>            
            <article className = {`relative min-w-68 flex flex-col items-center gap-4 z-5 pt-12 pb-6 px-8  bg-[#f6f4e8] rounded-lg shadow-md hover:shadow-lg transition-shadow group`}>
                <h2 className = {`z-10 text-center leading-[0.8] flex-col text-3xl font-semibold text-[#31322E]`}>{persona.nombre}<br />
                    <span className={'text-[#094C8A]  font-normal text-xl border-slate-700 pr-1'}>{(persona.apellidoPaterno ?? '').toUpperCase()}</span>
                    <span className={`text-[#C3891F] font-normal text-xl pl-1`}>{(persona.apellidoMaterno ?? '').toUpperCase()}</span>
                </h2>
                <div className= {`z-10 absolute left-1/2 -translate-x-1/2 -top-14 w-22 h-22 ${formaAvatar} overflow-hidden transition-transform group-hover:scale-115 duration-300 group`}>
                    <img className={`object-cover w-full h-full`} src={avatar} alt={`fotografía de ${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`}></img>
                </div>
                <div className= {`absolute left-1/2 -translate-x-1/2 -top-14 w-22 min-h-22 rounded-full
                            before:content-['']
                            before:absolute
                            before:-inset-0.5
                            ${formaAnillo}
                            before:border-2
                            before:border-[#B989F0]
                            before:shadow-md
                            before:transition-transform 
                            before:duration-300 
                            group-hover:before:scale-120
                            before:pointer-events-none`}> </div>
                {hasAnyData &&(
                <dl className={"w-full text-xs text-slate-700 border rounded-lg border-slate-300 px-1"}>
                    {/* Fecha Nacimiento */}
                    {persona.fechaNacimiento &&(
                    <div className={"flex items-center justify-between border-b border-slate-300 p-1"}>
                        <dt className={`flex items-center gap-1`}>
                            <NacimientoIcon className={`w-3 h-3`}/> Fecha de nacimiento: 
                        </dt>
                        <dd>
                            {persona.fechaNacimiento}
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
                                {persona.fechaDefuncion}
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

