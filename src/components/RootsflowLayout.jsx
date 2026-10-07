import 'family-chart/styles/family-chart.css';
import '../index.css';
import { useState, useEffect, useRef } from 'react';
import LayoutContext from './LayoutContext.jsx'
import { BsArrowLeft } from "react-icons/bs";



function RootsflowLayout ({ children, aside, onAsideTransitionEnd, isDarkMode }) {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [panelView, setPanelView] = useState("biography");
    const [showLeftArrow, setShowLeftArrow] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [asideWidth, setAsideWidth] = useState("1.5rem");
    const [isAnimating, setIsAnimating] = useState(false);
    const asideWidthRef = useRef(asideWidth);

    

    useEffect(() => {
        if (!isDragging) return;
        
        document.body.style.userSelect = "none";
        

        function handleMouseMove(e) {
            asideWidthRef.current = document.documentElement.clientWidth - e.clientX;

            if (asideWidthRef.current <= 24) {
                setAsideWidth(`1.5rem`);
                setIsCollapsed(true);
                handleMouseUp();
                return;
            }

            // --aside-max (index.css) limita el ancho según la resolución
            setAsideWidth(`min(${asideWidthRef.current}px, var(--aside-max))`);
        };

        function handleMouseUp() {
            setIsDragging(false);
            onAsideTransitionEnd();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.userSelect = "";
        };

    }, [isDragging]);

    useEffect( () => { // red de seguridad en caso de que no se ejecute el onTransitionEnd por spam de clicks
        const timeout = setTimeout(() => setIsAnimating(false), 800);
        return () => clearTimeout(timeout);
    }, [isAnimating])

    

    function handleMouseDown (e) {
        if (isAnimating) return;
        if (isCollapsed) return;
        e.preventDefault();
        setIsDragging(true);
    };

    const handleToggle = () => {
        // Usamos una variable local para lidiar con la asincronia del estado y no leer el estado desactualizado
        if (isAnimating) return;
        const newIsCollapsed = !isCollapsed;
        setIsCollapsed(newIsCollapsed);
        setAsideWidth(newIsCollapsed ? "1.5rem" : "var(--aside-max)");
        asideWidthRef.current = newIsCollapsed ? "1.5rem" : "var(--aside-max)";
        setIsAnimating(true);
    };

    const handleTransitionEnd = (e) => {
        if (e.target !== e.currentTarget) return;
        if (e.propertyName !== "width") return;
        setShowLeftArrow(isCollapsed);
        setIsAnimating(false);
        if (!isDragging) onAsideTransitionEnd();
        
    };

    const showPanel = (view) => {
        setPanelView(view);
        if (isCollapsed || (view === panelView) ) handleToggle();
    };


    return (
        <LayoutContext.Provider value={ {panelView, showPanel, handleToggle, isCollapsed} }>
            <div className={`grid grid-cols-[1fr_auto] gap-0 w-screen h-screen max-lg:h-dvh overflow-hidden`}>
                <div className="relative">
                    {children}
                </div>
                <aside className={`h-screen relative max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-dvh max-lg:z-20 transition-[width] ${isDragging ? "duration-0" : "duration-700"}
                                    ${isDarkMode
                                        ? `bg-darkBg shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)]`
                                        : `bg-white border-l border-neutral-200 shadow-[-10px_0_24px_-8px_rgba(15,23,42,0.12)]`}`}
                        style={{ width: `${asideWidth}`}}
                        onTransitionEnd={handleTransitionEnd}>
                        
                    <button
                        className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 text-xl rounded-full flex justify-center items-center w-11 h-11
                                    cursor-pointer z-10 transition-transform duration-300 hover:scale-120 will-change-transform
                                    ${isDarkMode
                                        ? `bg-button shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)]`
                                        : `bg-white border border-neutral-200 shadow-md shadow-neutral-900/10 hover:bg-neutral-50 hover:shadow-lg`}`}
                        aria-label="Alterna visualizacion de panel lateral"
                        onClick={handleToggle}
                        disabled={isAnimating}
                    >
                        <BsArrowLeft className={`w-5 h-5 transition-transform duration-300 ${isDarkMode ? "text-svg" : "text-lightFont"} ${showLeftArrow ? "" : "rotate-180" }`}/> 
                    </button>
                    {/* div para detectar borde izq del aside de forma consistente*/}
                    <div 
                        onMouseDown={handleMouseDown}  
                        className={`absolute w-4 h-full -translate-x-1/2 left-0 ${isCollapsed ? "" : "cursor-col-resize"} z-5`}> 
                    </div>
                    {/* min-w (ancho máximo del aside) asegura que el colapsado + difuminado sea en bloque*/}
                    <div className={`relative min-w-[var(--aside-max)] h-full text-pretty overflow-x-hidden overflow-y-auto transition-[opacity]
                                        [scrollbar-gutter:stable] [scrollbar-width:thin]
                                        ${isCollapsed ? "opacity-0 duration-300" : "opacity-100 duration-700 delay-300" } 
                                        ${isDarkMode 
                                            ? `[scrollbar-color:rgba(255,255,255,0.3)_transparent]`
                                            : `[scrollbar-color:rgba(0,0,0,0.2)_transparent]`}`}
                        inert={isCollapsed}
                    >
                        <div className={`grid max-w-[var(--aside-max)] gap-0 overflow-hidden`}>
                            {aside}
                        </div>
                    </div>
                </aside>
            </div>
        </LayoutContext.Provider>
    );
}






export default RootsflowLayout;
