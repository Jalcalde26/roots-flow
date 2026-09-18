import { useState } from "react";   
import calcularEdad from '../logica/calcularEdad.js'
import fechaFormateada from '../logica/fechaFormateada.js'
import isDeath from '../logica/isDeath.js'


function BiographyPanel({personas, mainId, personaOnClick, onClose}) {

    const persona =  personas.find(p=>p.id === mainId);
    const personaStatus = isDeath(persona.fechaDefuncion);

    
    const spouse = personas.find(p=> p.id === persona.parejasId[0]);
    

        return (
            <>
                {/* barra superior */}
                <div className="flex items-center justify-between mb-6 text-Roboto">
                    <span className="text-md tracking-wide text-neutral-200">
                    Bibliografia
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            aria-label="Cerrar panel"
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={""}>
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
                        <div className="w-full h-full flex items-center justify-center text-neutral-600">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                            </svg>
                        </div>
                        )}
                    </div>

                    {/* profesión */}
                    {persona.profesion && (
                        <p className="text-[13px] tracking-wide text-neutral-500 mb-1.5">
                        {profesion}
                        </p>
                    )}

                    {/* nombre */}
                    <h1 className="text-3xl font-normal leading-tight text-neutral-100 mb-2.5">
                       {persona.nombre} {persona.apellidoPaterno} {persona.apellidoMaterno} - {calcularEdad(persona.fechaNacimiento, persona.fechaDefuncion)} años
                    </h1>

                    {/* fechas + lugar */}
                    <p className="text-sm text-neutral-400 mb-5">
                        {persona.fechaNacimiento ? fechaFormateada(persona.fechaNacimiento) : "Desconocido"} — {personaStatus === true ? fechaFormateada(persona.fechaDefuncion) : personaStatus}
                        <br/>                                                                                      
                        {persona.lugarNacimiento ? `· ${persona.lugarNacimiento}` : ""}
                    </p>

                    </div>

                    <div>
                    {/* biografía -> cada indice 1 párrafo*/}
                    {persona.biografia && (
                        persona.biografia.map((paragraph, i) => (
                        <p
                        key={i}
                        className={`font-serif text-[15px] leading-[1.75] mb-4 ${
                            i === 0 ? "text-neutral-200" : "text-neutral-400"
                        }`}
                        >
                        {paragraph}
                        </p>
                    )))}

                    {/* cónyuge */}
                    {spouse && (
                        <div className="flex items-center gap-2 text-sm text-neutral-400 mt-6">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500">
                                <path d="M20.8 8.6c0 4.4-8.8 10.4-8.8 10.4S3.2 13 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" />
                            </svg>
                        {persona.sexo === "m" ? "Casada" : "Casado"} con {`${spouse.nombre} ${spouse.apellidoPaterno} ${spouse.apellidoMaterno}`}
                            <span className="text-neutral-600">·</span>
                            <button
                                onClick={() => personaOnClick(spouse.id)}
                                className="text-neutral-300 hover:text-neutral-100 underline underline-offset-2" //eliminar estilo boton -> link
                            >
                                ver ficha
                            </button> 
                        </div>
                    )}
                    </div>
                </div>
            </>
        );
        }  


export default BiographyPanel;