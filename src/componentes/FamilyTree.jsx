import * as f3 from 'family-chart';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLayoutContext } from './LayoutContext.jsx';
import normalizarData from "../logica/normalizarData.js";
import 'family-chart/styles/family-chart.css';
import '../index.css';
import getParentescoMainId from "../logica/parentesco.js";
import { FaUsersViewfinder } from "react-icons/fa6";
import { GiLaurelsTrophy } from "react-icons/gi";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";
import PeopleFinder from './PeopleFinder.jsx'

// IMPLEMENTAR HITOS VIDA
// IMPLEMENTE MODAL FOTOS
// IMPLEMENTAR BOTON-MENÚ FILTROS -> getMaxDepth(mainId) + (getMaxDepth(mainId).ancestry > 3 o getMaxDepth(mainId).progeny > 2 indicativo que invite a seguir navegando)
// MIGRAR TODO A INGLÉS
// DEBUGGEAR CODIGO
// INTRODUCIR DATOS FAMILIARES
// FIN DE PROYECTO FRONT-END
// APRENDER LIBRERIAS COMPLEMENTARIAS

function FamilyTree ({ personas, mainId, personaOnClick}, ref) {
    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const listadoParentescoRef = useRef(null);
    const esPrimerRender = useRef(true);
    const [isOpen, setIsOpen] = useState(true);
    const [isHoverReady, setIsHoverReady] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const { showPanel } = useLayoutContext();

    function resetView () { // Centrado de visión del arbol
        if (!chartRef.current) return;
        chartRef.current.updateTree({ tree_position: 'fit' });
    };

    useImperativeHandle(ref, () => ({ // Abrir scope para permitir resetar la vista del arbol al modificar layout.
        resetView,
    }));

    useEffect( () => {

        if (!containerRef.current) return;

        const data = normalizarData(personas); // Normalizar datos JSON/Base datos -> family-chart (libreria)
        listadoParentescoRef.current = getParentescoMainId(mainId, personas); // Calculo local de parentesco + sexo -> Controla color de card y forma de img cards.
        const chart = f3.createChart(containerRef.current, data)
            .setAncestryDepth(3) // Calcula x lineas ascendentes
            .setProgenyDepth(2) // Calcula x lineas descendentes
            .setSingleParentEmptyCard(false) // Elimina card vacia en caso de familia mono-parental
            /*.setLinkSpouseText((sp1, sp2) => { // Texto en la union de casados
                const weedingDate = sp1.data.data.weddingDate || sp2.data.data.weddingDate;
                const year = weedingDate ? weedingDate.split("-")[0] : "";
                return year ? `\u26AD ${year}` : "";
            })*/
            .setCardXSpacing(275).setCardYSpacing(150) // espacio por defecto -> x (250) y (150)
            //.setOrientationHorizontal() Cambia el arbol a horizontal
            .setShowSiblingsOfMain(true) // Muestra hermanos en el arbol
            .setSortChildrenFunction((a, b) => { // Ordenacion Mayor > Menor en hijos
                const fa = a.data.fullBirthDate ? new Date(a.data.fullBirthDate).getTime() : Infinity;
                const fb = b.data.fullBirthDate ? new Date(b.data.fullBirthDate).getTime() : Infinity;
                return fa - fb;
            });
            
        chart.setCardHtml()
            .setCardDisplay([["firstName", "lastName"],["birthday"]]) // Contenido texto cards
            .setMiniTree(false) // Mini arbol encima de las cards deshabilitado
            .setOnCardClick((e, d) => { // Modifica el foco de renderizado
                personaOnClick(d.data.id); // onPersonaClick = setPersonaInicialId (app.jsx)
            })
            .setOnCardUpdate(function (d) { // Personalización de estilos de las cards
                const info = listadoParentescoRef.current.find(p => p.id === d.data.id);
                const parentesco = info?.parentesco ?? "default";
                const sexo = info?.sexo ?? "default";

                const cardInner = this.querySelector('div.card-inner');
                if (!cardInner) return;
                cardInner.classList.add(`rama-${parentesco}`, `sexo-${sexo}`);
            });

        chart.updateMainId(mainId); // mainId = personaInicialId (app.jsx)
        chart.updateTree({ initial: true }); // initial:true indica que es el renderizado incial

        chartRef.current = chart;

        // FUNCION DE LIMPIEZA: se ejecuta antes del siguiente montaje (o al desmontar)
        return () => {
            if (containerRef.current) containerRef.current.innerHTML = ""; // vacia el contenedor por completo
        };
    }, []);

    const handleClick = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIsOpen(!isOpen);
    };

    const handleTransitionEnd = (e) => {
        if (e.target !== e.currentTarget) return;
        if (e.propertyName !== "grid-template-columns") return;
        setIsHoverReady(!isHoverReady);
        setIsAnimating(false);
    };

    useEffect( () => { // red de seguridad en caso de que no se ejecute el onTransitionEnd por spam de clicks
        const timeout = setTimeout(() => setIsAnimating(false), 900);
        return () => clearTimeout(timeout);
    }, [isAnimating]);


    useEffect( () => { // Actualización de arbol al cambiar foco

        // Si es el primer render, no actualizar (evita duplicación)
        if (esPrimerRender.current) { 
            esPrimerRender.current = false;
            return;
        }

        if (!chartRef.current) return;

        listadoParentescoRef.current = getParentescoMainId(mainId, personas); // Actualización del Calculo local al cambiar foco

        chartRef.current.updateMainId(mainId); // Actualizacion foco
        chartRef.current.updateTree(); // Actualizacion arbol

    }, [mainId, personas]);

    return( 
        <>
            <div
                className="f3 relative z-0"
                id="FamilyChart"
                ref={containerRef}
                style={{ width: '100%', height: '100%', margin: 'auto', backgroundColor: 'rgb(33,33,33)', color: '#fff' }}>
            </div>
            {/* Transición hecha con CSS vanilla a propósito, para reforzar el control manual de timing/orquestación en CSS vanilla.
                Próximas transiciones del proyecto se realizan con Motion (Framer Motion) por mantenibilidad y legibilidad del código */}
            <div className={`absolute top-35 left-43 grid items-center will-change-transform bg-[#4A5565] will-change-auto
                ${isOpen 
                    ? "grid-cols-[min-content_1fr] -translate-y-1 gap-0 rounded-r-2xl rounded-4xl [transition:translate_0.3s,grid-template-columns_0.5s_0.2s,border-radius_0.3s_0.5s] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.8)]" 
                    : `grid-cols-[min-content_0fr] gap-0 rounded-4xl
                        ${isHoverReady 
                            ? "hover:-translate-y-1 [transition:translate_0.3s,grid-template-columns_0.5s,border_0.4s,border-radius_0.3s]" 
                            : "-translate-y-1 [transition:grid-template-columns_0.5s,border_0.4s,border-radius_0.3s]"} 
                        `}
                `}
                onTransitionEnd={handleTransitionEnd}
            >
                <button
                    className={`text-md p-3 border-2 cursor-pointer bg-[#4A5565]
                        ${isOpen 
                            ? "border-white/60 rounded-4xl [transition:border-radius_0.3s]" 
                            : `rounded-xl
                                ${isHoverReady 
                                    ? "border-transparent hover:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.8)] [transition:border-radius_0.3s,border-color_0.2,box-shadow_0.3s]"
                                    : "border-transparent hover:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.8)] [transition:border-radius_0.3s_0.5s,border-color_0.2s_0.5s,box-shadow_0.3s_0.5s]"}`}
                    
                    `}
                    title="Buscar persona"
                    aria-label="Buscar persona"
                    onClick={handleClick}
                    disabled={isAnimating}
                >
                    <MdPersonSearch className="w-8 h-8" aria-hidden="true" focusable="false"/>
                </button>
                <div className={`min-w-0 overflow-hidden`}>
                    <PeopleFinder 
                                data = {personas}
                                onSelect = {personaOnClick}
                                isSearchOpen={isOpen}
                                shouldFocus={isOpen && !isAnimating}
                    >      
                    </PeopleFinder>
                </div>
            </div>
            <button 
                className="absolute bottom-48 left-5/10 -translate-x-1/2 text-md rounded-xl p-3 bg-[#4A5565] cursor-pointer z-10 transition-transform duration-300 hover:scale-110 will-change-transform hover:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.8)]" 
                title="Centrar vista"
                aria-label="Centrar vista del arbol genealogico"
                onClick={resetView}>
                <FaUsersViewfinder className="w-8 h-8"/>
            </button>
            <button 
                className="absolute bottom-40 left-7/10 -translate-x-1/2 text-md rounded-xl p-3 bg-[#4A5565] cursor-pointer z-10 transition-transform duration-300 hover:scale-110 will-change-transform hover:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.8)]" 
                title="Hitos de vida"
                aria-label="Ver hitos de vida"
                onClick={ () => showPanel("hitos")}>
                <GiLaurelsTrophy className="w-8 h-8"/>
            </button>
            <button 
                className="absolute bottom-40 left-3/10 -translate-x-1/2 text-md rounded-xl p-3 bg-[#4A5565] cursor-pointer z-10 transition-transform duration-300 hover:scale-110 will-change-transform hover:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.8)]" 
                title="Biografía"
                aria-label="Ver biografia"
                onClick={() => showPanel("biografia")}>
                <BsPersonLinesFill className="w-8 h-8"/>
            </button>
        </>
    );
};

export default forwardRef(FamilyTree);