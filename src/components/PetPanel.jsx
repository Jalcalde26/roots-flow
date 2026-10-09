import { calculatePetAge } from '../utils/calculateAge.js';
import InfoItem from './InfoItem.jsx'
import { IoLocationOutline } from "react-icons/io5";
import { TbCross } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import formatDate from '../utils/formatDate.js';
import isValidDate from "../utils/isValidDate.js";
import ModalPicture from './ModalPicture.jsx';


function PetPanel ({pet, isPetDead , onClose, isVisible, isDarkMode}) {
    if (!pet) return;
    const petAge = calculatePetAge(pet);
    return (
        <>
            <div className="relative min-h-0 overflow-hidden">
                <div className={`flex max-lg:flex-col rounded-xl mt-4 p-3 gap-4 ${isDarkMode ? `bg-neutral-800` : `bg-neutral-100`} transition-opacity duration-[700ms] ${isVisible ? "opacity-100" : "opacity-0"}`}>
                    <div className="h-40 h-[200px] w-[300px] max-3xl:h-40 max-3xl:w-40 max-3xl:shrink-0 max-lg:h-48 max-lg:w-full rounded-lg overflow-hidden">
                        {pet?.photo ? (
                        <ModalPicture
                            src= {pet.photo}
                            alt= {`fotografía de ${pet?.name}`}
                            className={"w-full h-full object-cover"}
                        />
                        ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? `bg-transparent text-neutral-300` : `bg-transparent text-neutral-500`}`}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                            </svg>
                        </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-evenly ml-4 max-3xl:ml-0 max-3xl:pr-6 max-lg:gap-2">
                        {/* Datos personales */}
                            <div className="flex flex-col justify-center">
                                <h2 className="capitalize text-xl font-medium">
                                {pet?.name}
                                    {petAge && (
                                    <span className="normal-case text-lg">
                                        {` - ${petAge} años`}
                                    </span>
                                    )}
                                </h2>
                            </div>
                            <dl className={`flex flex-col gap-[2px] text-sm ${isDarkMode ? `text-darkFont` : `text-lightFont`} mb-14 max-3xl:mb-2`}>
                                {/* Nacimiento - Muerte */}
                                <InfoItem Icon={TbCross} label="fecha de nacimiento y muerte" title="Nacimienfo - Defunción">
                                    {isValidDate(pet.birthDate)
                                        ? formatDate(pet.birthDate)
                                        : "Desconocido"}
                                        <span aria-hidden="true">-</span>
                                        {!isPetDead
                                            ? "Presente"
                                            : isValidDate(pet.deathDate)
                                                ? formatDate(pet.deathDate)
                                                : "Desconocido"}
                                </InfoItem>
                                {/* Lugar de nacimiento */}
                                {pet.birthPlace && (
                                <InfoItem Icon={IoLocationOutline} label="lugar de nacimiento" title="Lugar de nacimiento">
                                    {`${pet.birthPlace}`}
                                </InfoItem>
                                )}
                                {/* Especie y raza */}
                                {pet.species && (
                                <InfoItem Icon={IoPricetagsOutline} label="Especie y raza" title="Especie - raza">
                                    {`${pet.species}`}
                                    {pet.breed && (
                                    <>
                                        <span aria-hidden="true">-</span>
                                        {pet.breed}
                                    </>
                                    )}
                                </InfoItem>
                                )}
                            </dl>
                    </div>
                    {/* BTN cerrar panel */}
                    <button
                        className={`absolute cursor-pointer top-8 right-8 ${isDarkMode ? `hover:text-neutral-400` : `hover:text-neutral-500`} `}
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
