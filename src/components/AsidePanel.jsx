import calculateAge from '../utils/calculateAge.js';
import formatDate from '../utils/formatDate.js';
import isDead from '../utils/isDead.js';
import { IoLocationOutline } from "react-icons/io5";
import { PiHeartHalf } from "react-icons/pi";
import { PiCross } from "react-icons/pi";
import { BsBriefcase } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { HiOutlineLink } from "react-icons/hi2";
import isValidDate from "../utils/isValidDate.js";
import { LiaBabySolid } from "react-icons/lia";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { PiPawPrint } from "react-icons/pi";
import { useState } from 'react';
import { getChildren } from '../utils/familyUtilities.js';
import { useLayoutContext } from './LayoutContext.jsx';
import PetPanel from './PetPanel.jsx';
import InfoItem from './InfoItem.jsx';
import MilestoneTimeline from './MilestoneTimeline.jsx';


function AsidePanel({people, pets, mainId, onPersonClick, isDarkMode}) {

    const [activePetId, setActivePetId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const { panelView , handleToggle, showPanel } = useLayoutContext();

    // Al ser un calculo "barato" no se utiliza useMemo(). Contemplar si aumenta el coste.

    // lógica biografia
    const person =  people.find(p=>p.id === mainId);
    const isPersonDead = isDead(person.deathDate);
    const spouse = people.find(p=> p.id === person.spouseIds[0]);
    const age = calculateAge(person.birthDate, person.deathDate);
    const personChildren = getChildren(person, people);

    // lógica mascotas
    const petList = pets.filter(p => p.ownerId === person.id);
    const pet = petList.find(p => p.id === activePetId) ?? null;
    let isPetDead = null;
    if (pet) isPetDead = isDead(pet.deathDate);

    const handleTogglePet = (id) => {
        if (activePetId === id) {
            setIsVisible(!isVisible); // misma mascota: alterna
        } else {
            setActivePetId(id); // otra mascota: cambia y abre
            setIsVisible(true);
        }
    };

    const onClosePet = () => setIsVisible(false); // cerrar el panel desde dentro de PanelMascostas

    // lógica hitos

    

    return (
        <>
            {/* PANEL BIOGRAFIA */}
            <div className={`${panelView === "biography" ? "" : "hidden"} flex flex-col p-16 pr-14 gap-15 max-3xl:p-10 max-3xl:pr-8 max-3xl:gap-8 max-md:p-6 max-md:pr-5 max-md:gap-6`}>
                {/* barra superior */}
                <div className={`flex items-center justify-between mb-6`}>
                    <div className='flex justify-between gap-2'>
                        <button className={` ${isDarkMode ? "text-darkFont" : "text-lightFont"}`} aria-label="Ver biografía">
                        Biografía
                        </button>
                        <button className='cursor-pointer' aria-label='Intercambiar panel' onClick={panelView === "biography"
                                                                                                        ? () => showPanel("milestones")
                                                                                                        : () => showPanel("biography")}>
                            <MdOutlineSwapHoriz className={`h-6 w-6 origin-center transition-transform duration-300 hover:scale-120 ${isDarkMode ? "text-svg" : "text-lightFont"}`} aria-hidden='true' focusable="false"/>
                        </button>
                        <button className={`${isDarkMode ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-lightFont"} cursor-pointer `} 
                                aria-label="Ver hitos"
                                onClick={ () => showPanel("milestones")}>
                        Hitos
                        </button>
                    </div>
                    <button className={`cursor-pointer ${isDarkMode ? "text-darkFont hover:text-neutral-400" : "hover:text-neutral-500"}`} aria-label="Cerrar panel lateral" onClick={handleToggle}>
                        <IoClose className="w-4 h-4" aria-hidden="true" focusable="false"/>
                    </button>
                </div>

                <div className={` ${isDarkMode ? "text-darkFont" : "text-lightFont"}`}>
                    <div>
                    {/* foto  1000×750 px*/}
                    <div className="w-full aspect-[4/3] max-h-64 h-56 rounded-xl bg-neutral-800 overflow-hidden mb-6">
                        {person.photo ? (
                        <img
                            src={person.photo}
                            alt={`fotografía de ${person.firstName    } ${person.paternalSurname} ${person.maternalSurname}`}
                            className="w-full h-full object-cover object-top"
                        />
                        ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? `bg-neutral-900 text-neutral-300` : `bg-neutral-200 text-neutral-500`}`}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                            </svg>
                        </div>
                        )}
                    </div>

                    {/* nombre completo y edad */}
                    <h1 className="text-2xl max-md:text-xl font-medium leading-tight mb-2.5">
                        {person.firstName} {person.paternalSurname} {person.maternalSurname}
                        {age && (
                        <span className="text-xl max-md:text-lg font-normal">
                            {` - ${age} años`}
                        </span>
                        )}
                    </h1>

                    {/* datos personales */}
                    <dl className={`flex flex-col gap-[0.5rem] text-sm ${isDarkMode ? "text-darkFont" : "text-lightFont"}`}>
                        {/* nacimiento - muerte */}
                        <InfoItem Icon={PiCross} label={"fecha de nacimiento y muerte"} title="Nacimiento - Defunción">
                            {isValidDate(person.birthDate)
                                ? formatDate(person.birthDate)
                                : "Desconocido"}
                                <span aria-hidden="true">-</span>
                                {!isPersonDead
                                    ? "Presente"
                                    : isValidDate(person.deathDate)
                                        ? formatDate(person.deathDate)
                                        : "Desconocido"}
                        </InfoItem>

                        {/* Lugar de nacimiento */}
                        <InfoItem Icon={IoLocationOutline} label={"Lugar de nacimiento"} title="Lugar de nacimiento">
                            {person.birthPlace ? `${person.birthPlace}` : ""}
                        </InfoItem>

                        {/* Profesion */}
                        {person.profession && (
                        <InfoItem Icon={BsBriefcase} label={"Profesión"} title="Profesión">
                            {person.profession}
                        </InfoItem>
                        )}
                        {/* Pareja de hecho */}
                        {spouse && (
                        <div className={`flex items-start flex-wrap gap-2`}>
                            <dt className="flex items-start gap-2">
                                <PiHeartHalf className="w-4 h-4" aria-hidden="true" focusable="false" />
                                {person.sex === "female" ? "Casada" : "Casado"} con
                            </dt>
                            <dd className="flex flex-wrap items-center gap-2">
                                <button className={`capitalize ${isDarkMode ? `text-darkFont hover:text-neutral-300` : `text-lightFont hover:text-neutral-500`} underline underline-offset-2 cursor-pointer`}
                                        aria-label="Ver pareja"
                                        onClick={() => onPersonClick(spouse.id)}>
                                    {spouse.firstName} {spouse.paternalSurname} {spouse.maternalSurname}
                                </button>
                            </dd>
                            {isValidDate(person.marriageDate) && (
                            <span className="flex gap-2 items-center" title="Fecha de boda"><HiOutlineLink className="w-4 h-4"/>{formatDate(person.marriageDate)}</span>
                            )}
                        </div>
                        )}
                        {/* Hijos */}
                        {personChildren.length > 0 && (
                        <div className={`flex items-start gap-2`}>
                            <dt className="flex items-center gap-2">
                                <LiaBabySolid className="w-4 h-4" aria-hidden="true" focusable="false" />
                                {personChildren.length > 1
                                    ? "Hijos:"
                                    : personChildren[0].sex === "female"
                                        ? "Hija:"
                                        : "Hijo:"}
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                                {personChildren.map( c => (
                                    <button className={`capitalize ${isDarkMode ? "text-darkFont hover:text-neutral-300" : "text-lightFont hover:text-neutral-500"} underline underline-offset-2 cursor-pointer`}
                                        aria-label="Ver hijo"
                                        onClick={() => onPersonClick(c.id)}
                                        key={c.id}>
                                        {c.firstName}
                                    </button>
                                ))}
                            </dd>
                        </div>
                        )}
                        {/* Mascotas */}
                        {petList.length > 0 && (
                        <div className={`flex items-start gap-2`}>
                            <dt className="flex items-center gap-2">
                                <PiPawPrint className="w-4 h-4" aria-hidden="true" focusable="false" />
                                {petList.length > 1 ? "Mascotas:" : "Mascota:"}
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                                {petList.map( p => (
                                    <button className={`capitalize ${isDarkMode ? "text-white hover:text-neutral-300" : "text-lightFont hover:text-neutral-500"} underline underline-offset-2 cursor-pointer`}
                                        aria-label="Ver mascota"
                                        onClick={() => handleTogglePet(p.id)}
                                        key={p.id}>
                                        {p.name}
                                    </button>
                                ))}
                            </dd>
                        </div>
                        )}
                    </dl>
                </div>
                {/* Panel de mascotas*/}
                <div className={`grid transition-[grid-template-rows] text-pretty duration-700 ${isVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <PetPanel
                        key={mainId}
                        pet = {pet}
                        isPetDead = {isPetDead}
                        onClose = {onClosePet}
                        isVisible={isVisible}
                        isDarkMode = {isDarkMode}
                    />
                </div>

                {/* Sección biografía */}
                <div className={`mt-4 border-t ${isDarkMode ? `border-neutral-600`: `border-neutral-300`} pt-6`}>
                    {/* biografía -> cada indice 1 párrafo*/}
                    {person.biography && (
                        person.biography.map((paragraph, i) => (
                        <p
                        key={i}
                        className={`text-base mb-4 
                            ${i === 0 
                                ? (isDarkMode ? `text-white` : `text-neutral-900`)
                                : (isDarkMode ? `text-neutral-200` : `text-neutral-700`)
                            }`}
                        >
                        {paragraph}
                        </p>
                    )))}
                    </div>
                </div>
            </div>
            {/* PANEL HITOS */}
            <MilestoneTimeline
                person={person}
                mainId={mainId}
                showPanel ={showPanel}
                handleToggleAside={handleToggle}
                panelView = {panelView}
                isDarkMode = {isDarkMode}
            >
            </MilestoneTimeline>
            
        </>
    );
}

export default AsidePanel;

/* 

*/