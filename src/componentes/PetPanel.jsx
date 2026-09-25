import { calcularMascotaEdad } from '../logica/calcularEdad.js';
import Dato from './Dato.jsx'
import { IoLocationOutline } from "react-icons/io5";
import { TbCross } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import fechaFormateada from '../logica/fechaFormateada.js';
import esFechaValida from "../logica/esFechaValida.js";


function PetPanel ({mascota, isMascotaDeath , onClose, isVisible}) {
    if (!mascota) return;
    const mascotaEdad = calcularMascotaEdad(mascota);
    return (
        <>
            <div className="relative min-h-0 overflow-hidden">
                <div className={`flex rounded-xl mt-4 p-3 gap-4 bg-neutral-800 transition-opacity duration-[700ms] ${isVisible ? "opacity-100" : "opacity-0"}`}> 
                    <div className="h-40 h-[200px] w-[300px] rounded-lg overflow-hidden">
                        {mascota?.fotografia ? (
                        <img
                            src={mascota?.fotografia}
                            alt={`fotografía de ${mascota?.nombre}`}
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
                    <div className="flex flex-col justify-evenly ml-4">
                        {/* Datos personales */}
                            <div className="flex flex-col justify-center">
                                <h2 className="capitalize text-xl font-medium leading-tight text-roboto">
                                {mascota?.nombre}
                                    {mascotaEdad && (
                                    <span className="text-lg font-normal">
                                        {` - ${mascotaEdad} años`}
                                    </span>
                                    )}
                                </h2>
                            </div>
                            <dl className="flex flex-col gap-[2px] text-sm text-neutral-300 mb-14">
                                {/* Nacimiento - Muerte */}
                                <Dato Icono={TbCross} etiqueta="fecha de nacimiento y muerte" title="Nacimienfo - Defunción">
                                    {esFechaValida(mascota.fechaNacimiento)
                                        ? fechaFormateada(mascota.fechaNacimiento) 
                                        : "Desconocido"} 
                                        <span aria-hidden="true">-</span>
                                        {!isMascotaDeath
                                            ? "Presente" 
                                            : esFechaValida(mascota.fechaDefuncion) 
                                                ? fechaFormateada(mascota.fechaDefuncion) 
                                                : "Desconocido"}
                                </Dato>
                                {/* Lugar de nacimiento */}
                                {mascota.lugarNacimiento && (
                                <Dato Icono={IoLocationOutline} etiqueta="lugar de nacimiento" title="Lugar de nacimiento"> 
                                    {`${mascota.lugarNacimiento}`}
                                </Dato>
                                )}
                                {/* Especie y raza */}
                                {mascota.especie && (
                                <Dato Icono={IoPricetagsOutline} etiqueta="Especie y raza" title="Especie - raza"> 
                                    {`${mascota.especie}`}
                                    {mascota.raza && (
                                    <>
                                        <span aria-hidden="true">-</span>
                                        {mascota.raza}
                                    </>
                                    )}
                                </Dato>
                                )}
                            </dl>
                    </div>
                    {/* BTN cerrar panel */}
                    <button 
                        className="absolute cursor-pointer top-8 right-8 hover:text-neutral-400" 
                        onClick={onClose}
                        aria-label="Cerrar panel de mascotas">
                            <IoClose className="w-4 h-4" aria-hidden="true" focusable="false"/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default PetPanel;
