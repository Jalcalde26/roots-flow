import { useState } from 'react';
import fechaFormateada from '../logica/fechaFormateada.js';
import esFechaValida from '../logica/esFechaValida.js';
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { PiFlagPennantFill } from "react-icons/pi";

function MilestoneTimeline({ persona, mainId, showPanel, panelView, handleToggleAside, isDarkMode }) {

    const [milestoneActiveIndex, setMilestoneActiveIndex] = useState(null);

    const milestones = persona?.milestones ?? [];

    const handleToggle = (index) => {
        setMilestoneActiveIndex(prev => (prev === index ? null : index));
    };

    if (milestones.length === 0) {
        return (
            <div className={`${panelView === "hitos" ? "" : "hidden"} p-16 pr-14`}>
                <div className={`flex items-center justify-between mb-6`}>
                    <div className='flex justify-between gap-2'>
                        <button className={`${isDarkMode ? `text-neutral-400 hover:text-white` : "text-neutral-500 hover:text-lightFont"} cursor-pointer`} 
                                aria-label="Ver biografía"
                                onClick={ () => showPanel("biografia")}>
                        Biografía
                        </button>
                        <button className='cursor-pointer' aria-label='Intercambiar panel' onClick={panelView === "biografia" 
                                                                                                        ? () => showPanel("hitos") 
                                                                                                        : () => showPanel("biografia")}>
                            <MdOutlineSwapHoriz className='h-6 w-6 origin-center transition-transform duration-300 hover:scale-120 text-svg' aria-hidden='true' focusable="false"/>
                        </button>
                        <button className={`${isDarkMode ? `text-darkFont` : `text-lightFont`}`} aria-label="Ver hitos">
                        Hitos
                        </button>
                    </div>
                    <button className={`cursor-pointer ${isDarkMode ? `text-darkFont hover:text-neutral-400` : `hover:text-neutral-500`}`} aria-label="Cerrar panel lateral" onClick={handleToggleAside}>
                        <IoClose className="w-4 h-4" aria-hidden="true" focusable="false"/>
                    </button>
                </div>
                <div className="flex w-full justify-center items-center mt-20"> 
                    <p className={`block text-2xl ${isDarkMode ? `text-neutral-400` : `text-neutral-500`}`}>No hay hitos registrados.</p>
                </div>
            </div>
                
        
        );
    };

    return (

    <div className={`flex flex-col ${panelView === "hitos" ? "" : "hidden"} p-16 pr-14 pb-40 h-[100vh] gap-20`}>

        <div className={`flex items-center justify-between mb-6`}>
            <div className='flex gap-2'>
                <button className={` ${isDarkMode ? `text-neutral-400 hover:text-white` : `text-neutral-500 hover:text-lightFont`}  cursor-pointer`} 
                        aria-label="Ver biografía"
                        onClick={ () => showPanel("biografia")}>
                Biografía
                </button>
                <button className='cursor-pointer' aria-label='Intercambiar panel' onClick={panelView === "biografia" 
                                                                                                ? () => showPanel("hitos") 
                                                                                                : () => showPanel("biografia")}>
                    <MdOutlineSwapHoriz className='h-6 w-6 origin-center transition-transform duration-300 hover:scale-120 text-svg' aria-hidden='true' focusable="false"/>
                </button>
                <button className={`${isDarkMode ? `text-darkFont` : `text-lightFont`}`} aria-label="Ver hitos">
                Hitos
                </button>
            </div>
            <button className={`cursor-pointer text-svg ${isDarkMode ? `hover:text-neutral-400` : ``}`} aria-label="Cerrar panel lateral" onClick={handleToggleAside}>
                <IoClose className="w-4 h-4" aria-hidden="true" focusable="false"/>
            </button>
        </div>
        <div className="flex-1 flex justify-center">
            <ol className={`flex ${milestones.length <= 2 ? "justify-start gap-20" : "justify-between gap-10"}  flex-col border-l ${isDarkMode ? `border-neutral-600` : `border-neutral-300`} ml-2 mt-8 py-10`}>
                {milestones.map((milestone, index) => {
                    const isActive = milestoneActiveIndex === index;
                    return (
                        <li key={index} className="relative pl-8 ">
                            <button
                                className={`absolute -left-[13px] top-6 flex items-center justify-center w-7 h-7 rounded-full border border-transparent transition-colors duration-300 cursor-pointer
                                    ${isActive 
                                        ? (isDarkMode ? `bg-neutral-100` : `bg-neutral-400`)
                                        : (isDarkMode ? `bg-neutral-700 hover:border hover:border-neutral-300` : `bg-neutral-200 hover:border hover:border-neutral-500`)
                                    }`}
                                onClick={() => handleToggle(index)}
                            >
                                <PiFlagPennantFill className={`w-3 h-3 transition-colors duration-300 ${isActive ? "text-black" : "text-svg"}`}focusable="false" aria-hidden="true"/>
                            </button>

                            <button
                                className={`w-full text-left rounded-2xl border transition-all cursor-pointer px-6 py-5
                                    ${isActive
                                        ? (isDarkMode ? `bg-neutral-800 border-neutral-600 shadow-lg shadow-black/20` : `bg-neutral-100 border-neutral-300 shadow-lg shadow-black/10`)
                                        : (isDarkMode ? `bg-neutral-900 border-neutral-800 hover:bg-neutral-800/70 hover:border-neutral-700` : `bg-white border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300`)
                                    }
                                `}
                                aria-expanded={isActive}
                                aria-label={`Ver hito: ${milestone.title}`}
                                onClick={() => handleToggle(index)}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col gap-2 min-w-0 text-darkFont">
                                        <h2 className={`text-base font-semibold ${isDarkMode ? `text-darkFont` : `text-lightFont`}`}>
                                            {milestone.title}
                                        </h2>
                                        {esFechaValida(milestone.date) && (
                                            <time className={`text-xs ${isDarkMode ? `text-neutral-300` : `text-neutral-500`}`}>
                                                {fechaFormateada(milestone.date)}
                                            </time>
                                        )}
                                    </div>
                                    <IoChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 
                                            ${isActive 
                                                ? (isDarkMode ? `rotate-180 text-white` : `rotate-180 text-lightFont`)
                                                : (isDarkMode ? `text-neutral-500` : `text-neutral-400`)
                                            }`}
                                        aria-hidden="true"
                                        focusable="false"
                                    />
                                </div>

                                <div
                                    className={`grid transition-all duration-300 text-pretty overflow-hidden ${
                                        isActive ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="min-h-0">
                                        <p className={`text-sm ${isDarkMode ? `text-neutral-300` : `text-neutral-600`} leading-relaxed pr-2`}>
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </div>
    </div>
    );
}

export default MilestoneTimeline;