import { useState } from 'react';
import fechaFormateada from '../logica/fechaFormateada.js';
import esFechaValida from '../logica/esFechaValida.js';
import { IoChevronDown } from "react-icons/io5";

function MilestoneTimeline({ data, mainId }) {
    const [hitoActivoIndex, setHitoActivoIndex] = useState(null);

    const persona = data.find(p => p.id === mainId);
    const hitos = persona?.hitos ?? [];

    const handleToggle = (index) => {
        setHitoActivoIndex(prev => (prev === index ? null : index));
    };

    if (hitos.length === 0) {
        return (
            <p className="text-sm text-neutral-400">No hay hitos registrados.</p>
        );
    }

    return (
        <ol className="relative border-l border-neutral-700 ml-2">
            {hitos.map((hito, index) => {
                const isActive = hitoActivoIndex === index;
                return (
                    <li key={index} className="relative mb-6 ml-6 last:mb-0">
                        <span
                            className={`absolute -left-[29px] top-1 flex items-center justify-center w-3 h-3 rounded-full ring-4 ring-neutral-900 transition-colors ${
                                isActive ? "bg-white" : "bg-neutral-600"
                            }`}
                            aria-hidden="true"
                        />
                        <button
                            className="flex items-center justify-between w-full text-left cursor-pointer group"
                            aria-expanded={isActive}
                            aria-label={`Ver hito: ${hito.titulo}`}
                            onClick={() => handleToggle(index)}
                        >
                            <div>
                                <p
                                    className={`text-sm font-medium transition-colors ${
                                        isActive ? "text-white" : "text-neutral-300"
                                    } group-hover:text-white`}
                                >
                                    {hito.titulo}
                                </p>
                                {esFechaValida(hito.fecha) && (
                                    <time className="text-xs text-neutral-500">
                                        {fechaFormateada(hito.fecha)}
                                    </time>
                                )}
                            </div>
                            <IoChevronDown
                                className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
                                    isActive ? "rotate-180" : ""
                                }`}
                                aria-hidden="true"
                                focusable="false"
                            />
                        </button>

                        <div
                            className={`grid transition-all duration-300 text-pretty overflow-hidden ${
                                isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="min-h-0">
                                <p className="text-sm text-neutral-300 leading-relaxed pr-2">
                                    {hito.descripcion}
                                </p>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

export default MilestoneTimeline;