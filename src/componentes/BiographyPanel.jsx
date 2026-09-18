import calcularEdad from '../logica/calcularEdad.js'
import fechaFormateada from '../logica/fechaFormateada.js'
import isDeath from '../logica/isDeath.js'
import { IoLocationOutline } from "react-icons/io5";
import { PiHeartHalf } from "react-icons/pi";
import { TbCross } from "react-icons/tb";
import { MdWorkOutline } from "react-icons/md";
import esFechaValida from "../logica/esFechaValida.js";
import { LiaBabySolid } from "react-icons/lia";


function BiographyPanel({personas, mascotas, mainId, personaOnClick, onClose}) {

    const persona =  personas.find(p=>p.id === mainId);
    const personaIsDeath = isDeath(persona.fechaDefuncion);
    const spouse = personas.find(p=> p.id === persona.parejasId[0]);
    const edad = calcularEdad(persona.fechaNacimiento, persona.fechaDefuncion);
    const hijos = persona.hijosIds
        .map(id => personas.find( p => p.id === id))
        .filter(Boolean);
    hijos.sort((a,b) => calcularEdad(b.fechaNacimiento, b.fechaDefuncion) - calcularEdad(a.fechaNacimiento, a.fechaDefuncion));
    const mascota = mascotas.find(m => m.duenoId === persona.id);
    //IMPLEMENTAR MASCOTAS + RENDERIZADO DIV AL CLICAR BOTON
    // IMPLEMENTAR HITOS VIDA

        return (
            <>
                {/* barra superior */}
                <div className="flex items-center justify-between mb-6 text-white text-roboto">
                    <span className="text-md tracking-wide ">
                    Biografía
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            aria-label="Cerrar panel"
                            className=" hover:text-neutral-500 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={"text-white text-roboto"}>
                    <div>
                    {/* foto */}
                    <div className="max-w-[360px] h-56 rounded-2xl bg-neutral-800 overflow-hidden mb-6">
                        {persona.fotografia ? (
                        <img
                            src={persona.fotografia}
                            alt={`fotografía de ${persona.name} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`}
                            className="w-full h-full object-cover"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                            </svg>
                        </div>
                        )}
                    </div>

                    {/* nombre completo y edad */}
                    <h1 className="text-2xl font-medium leading-tight mb-2.5 text-roboto">
                        {persona.nombre} {persona.apellidoPaterno} {persona.apellidoMaterno}
                        {edad && (
                        <span className="text-xl font-normal">
                            {` - ${edad} años`}
                        </span>
                        )}
                    </h1>

                    {/* datos personales */}
                    <p className="text-sm text-neutral-300 mb-5">
                        {/* nacimiento - muerte */}
                        <span className="flex items-center gap-2">
                            <TbCross className="w-4 h-4" /> 
                            {esFechaValida(persona.fechaNacimiento)? fechaFormateada(persona.fechaNacimiento) : "Desconocido"} - {!personaIsDeath ? "Presente" 
                                : esFechaValida(persona.fechaDefuncion) ? fechaFormateada(persona.fechaDefuncion) 
                                : "Desconocido"}                                                                                      
                        </span>
                        {/* Lugar de nacimiento */}
                        <span className="flex items-center gap-2 mt-1">
                            <IoLocationOutline className={`w-4 h-4`}/> 
                            {persona.lugarNacimiento ? `${persona.lugarNacimiento}` : ""}
                        </span>
                        {/* Profesion */}
                        {persona.profesion && (
                        <span className="flex items-center gap-2 mt-1">
                            <MdWorkOutline className={`w-4 h-4`}/>
                            {persona.profesion}
                        </span>)
                        }
                        {/* Pareja de hecho */}
                        {spouse && (
                        <span className="flex items-center gap-2 mt-1">
                                <PiHeartHalf className="w-4 h-4"/>
                                {persona.sexo === "m" ? "Casada" : "Casado"} con 
                                <button className="text-white hover:text-neutral-300 underline underline-offset-2"
                                        onClick={() => personaOnClick(spouse.id)}
                                >
                                    {spouse.nombre} {spouse.apellidoPaterno} {spouse.apellidoMaterno}
                                </button>
                        </span>)
                        }
                        {/* hijos */}
                        {hijos.length > 0 && (
                        <span className="flex flex-wrap items-center gap-2 mt-1">
                                <LiaBabySolid className="w-4 h-4"/>
                                hijos:
                                {hijos.map( h => (
                                    <button className="text-white hover:text-neutral-300 underline underline-offset-2"
                                        onClick={() => personaOnClick(h.id)}
                                        key={h.id}>
                                        {h.nombre} {h.apellidoPaterno} {h.apellidoMaterno}
                                    </button>
                                ))}
                        </span>
                        )}
                    </p>

                    </div>

                    <div>
                        <div className='w-full  border-b border-neutral-500 mb-4'></div>
                    {/* biografía -> cada indice 1 párrafo*/}
                    {persona.biografia && (
                        persona.biografia.map((paragraph, i) => (
                        <p
                        key={i}
                        className={`font-roboto text-base mb-4 ${
                            i === 0 ? "text-white" : "text-neutral-200"
                        }`}
                        >
                        {paragraph}
                        </p>
                    )))}
                    </div>
                </div>
            </>
        );
        }  


export default BiographyPanel;