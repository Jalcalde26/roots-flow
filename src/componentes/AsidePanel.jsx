import calcularEdad from '../logica/calcularEdad.js';
import fechaFormateada from '../logica/fechaFormateada.js';
import isDeath from '../logica/isDeath.js';
import { IoLocationOutline } from "react-icons/io5";
import { PiHeartHalf } from "react-icons/pi";
import { TbCross } from "react-icons/tb";
import { MdWorkOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { HiOutlineLink } from "react-icons/hi2";
import esFechaValida from "../logica/esFechaValida.js";
import { LiaBabySolid } from "react-icons/lia";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { PiPawPrint } from "react-icons/pi";
import { useState } from 'react';
import { getHijos } from '../logica/familyUtilities.js';
import { useLayoutContext } from './LayoutContext.jsx';
import PetPanel from './PetPanel.jsx';
import Dato from './Dato.jsx';


function AsidePanel({personas, mascotas, mainId, personaOnClick}) {

    const [mascotaActivaId, setMascotaActivaId] = useState(null); 
    const [isVisible, setIsVisible] = useState(false);
    const { panelView , handleToggle, showPanel } = useLayoutContext();

    // Al ser un calculo "barato" no se utiliza useMemo(). Contemplar si aumenta el coste.

    // lógica biografia
    const persona =  personas.find(p=>p.id === mainId);
    const isPersonaDeath = isDeath(persona.fechaDefuncion);
    const spouse = personas.find(p=> p.id === persona.parejasId[0]);
    const edad = calcularEdad(persona.fechaNacimiento, persona.fechaDefuncion);
    const hijos = getHijos(persona, personas);

    // lógica mascotas
    const listadoMascotas = mascotas.filter(m => m.duenoId === persona.id);
    const mascota = listadoMascotas.find(m => m.id === mascotaActivaId) ?? null;
    let isMascotaDeath = null;
    if (mascota) isMascotaDeath = isDeath(mascota.fechaDefuncion);

    const handleToggleMascota = (id) => {
        if (mascotaActivaId === id) {
            setIsVisible(!isVisible); // misma mascota: alterna
        } else {
            setMascotaActivaId(id); // otra mascota: cambia y abre
            setIsVisible(true);
        }
    };

    const onCloseMascota = () => setIsVisible(false); // cerrar el panel desde dentro de PanelMascostas

    // lógica hitos

    

    return (
        <>
            {/* PANEL BIOGRAFIA */}
            <div className={`${panelView === "biografia" ? "" : "hidden"} p-16 pr-14`}>
                {/* barra superior */}
                <div className={`flex items-center justify-between mb-6`}>
                    <div className='flex justify-between gap-2'>
                        <button className={`biografia ? text-white`} aria-label="Ver biografía">
                        Biografía
                        </button>
                        <button className='cursor-pointer' aria-label='Intercambiar panel' onClick={panelView === "biografia" 
                                                                                                        ? () => showPanel("hitos") 
                                                                                                        : () => showPanel("biografia")}>
                            <MdOutlineSwapHoriz className='h-6 w-6 origin-center transition-transform duration-300 hover:scale-120 ' aria-hidden='true' focusable="false"/>
                        </button>
                        <button className={`text-neutral-400 hover:text-white cursor-pointer `} 
                                aria-label="Ver hitos"
                                onClick={ () => showPanel("hitos")}>
                        Hitos
                        </button>
                    </div>
                    <button className="cursor-pointer hover:text-neutral-400" aria-label="Cerrar panel lateral" onClick={handleToggle}>
                        <IoClose className="w-4 h-4" aria-hidden="true" focusable="false"/>
                    </button>
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
                    <dl className="flex flex-col gap-[0.5rem] text-sm text-neutral-300">
                        {/* nacimiento - muerte */}
                        <Dato Icono={TbCross} etiqueta={"fecha de nacimiento y muerte"} title="Nacimiento - Defunción">
                            {esFechaValida(persona.fechaNacimiento)
                                ? fechaFormateada(persona.fechaNacimiento) 
                                : "Desconocido"} 
                                <span aria-hidden="true">-</span>
                                {!isPersonaDeath 
                                    ? "Presente" 
                                    : esFechaValida(persona.fechaDefuncion) 
                                        ? fechaFormateada(persona.fechaDefuncion) 
                                        : "Desconocido"}
                        </Dato>

                        {/* Lugar de nacimiento */}
                        <Dato Icono={IoLocationOutline} etiqueta={"Lugar de nacimiento"} title="Lugar de nacimiento">
                            {persona.lugarNacimiento ? `${persona.lugarNacimiento}` : ""}
                        </Dato>
                        
                        {/* Profesion */}
                        {persona.profesion && (
                        <Dato Icono={MdWorkOutline} etiqueta={"Profesión"} title="Profesión">
                            {persona.profesion}
                        </Dato>
                        )}
                        {/* Pareja de hecho */}
                        {spouse && (
                        <div className={`flex items-start flex-wrap gap-2`}>
                            <dt className="flex items-start gap-2">
                                <PiHeartHalf className="w-4 h-4" aria-hidden="true" focusable="false" />
                                {persona.sexo === "m" ? "Casada" : "Casado"} con
                            </dt>
                            <dd className="flex flex-wrap items-center gap-2">
                                <button className="capitalize text-white hover:text-neutral-300 underline underline-offset-2 cursor-pointer"
                                        aria-label="Ver pareja"
                                        onClick={() => personaOnClick(spouse.id)}>
                                    {spouse.nombre} {spouse.apellidoPaterno} {spouse.apellidoMaterno}
                                </button>
                            </dd>
                            {esFechaValida(persona.fechaMatrimonio) && (
                            <span className="flex gap-2 items-center" title="Fecha de boda"><HiOutlineLink className="w-4 h-4"/>{fechaFormateada(persona.fechaMatrimonio)}</span>
                            )}
                        </div>
                        )}  
                        {/* Hijos */}
                        {hijos.length > 0 && (
                        <div className={`flex items-start gap-2`}>
                            <dt className="flex items-center gap-2">
                                <LiaBabySolid className="w-4 h-4" aria-hidden="true" focusable="false" />
                                {hijos.length > 1 
                                    ? "Hijos:" 
                                    : hijos[0].sexo === "m" 
                                        ? "Hija:"
                                        : "Hijo:"}
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                                {hijos.map( h => (
                                    <button className="capitalize text-white hover:text-neutral-300 underline underline-offset-2 cursor-pointer"
                                        aria-label="Ver hijo"
                                        onClick={() => personaOnClick(h.id)}
                                        key={h.id}>
                                        {h.nombre}
                                    </button>
                                ))}
                            </dd>
                        </div>
                        )}
                        {/* Mascotas */}
                        {listadoMascotas.length > 0 && (
                        <div className={`flex items-start gap-2`}>
                            <dt className="flex items-center gap-2">
                                <PiPawPrint className="w-4 h-4" aria-hidden="true" focusable="false" />
                                {listadoMascotas.length > 1 ? "Mascotas:" : "Mascota:"}
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                                {listadoMascotas.map( m => (
                                    <button className="capitalize text-white hover:text-neutral-300 underline underline-offset-2 cursor-pointer"
                                        aria-label="Ver mascota"
                                        onClick={() => handleToggleMascota(m.id)}
                                        key={m.id}>
                                        {m.nombre}
                                    </button>
                                ))}
                            </dd>
                        </div>
                        )}
                    </dl>
                </div>
                {/* Panel de mascotas*/}
                <div className={`grid transition-all text-pretty duration-700 ${isVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <PetPanel
                        key={mainId}
                        mascota = {mascota}
                        isMascotaDeath = {isMascotaDeath}
                        onClose = {onCloseMascota}
                        isVisible={isVisible}
                    />
                </div>

                {/* Sección biografía */}
                <div className="pt-4">
                    <div className='w-full border-b border-neutral-500 mb-4'></div>
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
            </div>

            {/* PANEL HITOS */}
            <div className={`${panelView === "hitos" ? "" : "hidden"} p-16 pr-14 `}>
                <div className={`flex items-center justify-between mb-6`}>
                    <div className='flex justify-between gap-2'>
                        <button className={`text-neutral-400 hover:text-white cursor-pointer`} 
                                aria-label="Ver biografía"
                                onClick={ () => showPanel("biografia")}>
                        Biografía
                        </button>
                        <button className='cursor-pointer' aria-label='Intercambiar panel' onClick={panelView === "biografia" 
                                                                                                        ? () => showPanel("hitos") 
                                                                                                        : () => showPanel("biografia")}>
                            <MdOutlineSwapHoriz className='h-6 w-6 origin-center transition-transform duration-300 hover:scale-120 ' aria-hidden='true' focusable="false"/>
                        </button>
                        <button className={`text-white`} aria-label="Ver hitos">
                        Hitos
                        </button>
                    </div>
                    <button className={`cursor-pointer hover:text-neutral-400`} aria-label="Cerrar panel lateral" onClick={handleToggle}>
                        <IoClose className="w-4 h-4" aria-hidden="true" focusable="false"/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default AsidePanel;