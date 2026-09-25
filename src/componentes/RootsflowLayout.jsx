import 'family-chart/styles/family-chart.css';
import '../index.css';
import { useState, useEffect, useRef } from 'react';
import LayoutContext from './LayoutContext.jsx'

function RootsflowLayout ({ children, aside, onAsideTransitionEnd }) {

    const [isColapsed, setIsColapsed] = useState(true);
    const [panelView, setPanelView] = useState("biografia");
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

            if (asideWidthRef.current >= document.documentElement.clientWidth * 0.3) {
                setAsideWidth(`30vw`);
                return;
            }

            if (asideWidthRef.current <= 24) {
                setAsideWidth(`1.5rem`);  
                setIsColapsed(true);
                handleMouseUp(); 
                return;
            }

            setAsideWidth(`${asideWidthRef.current}px`);               
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
        if (isColapsed) return;
        e.preventDefault();
        setIsDragging(true);
    };

    const handleToggle = () => {
        // Usamos una variable local para lidiar con la asincronia del estado y no leer el estado desactualizado
        if (isAnimating) return;
        const newIsColapsed = !isColapsed;
        setIsColapsed(newIsColapsed);
        setAsideWidth(newIsColapsed ? "1.5rem" : "30vw");
        asideWidthRef.current = newIsColapsed ? "1.5rem" : "30vw";
        setIsAnimating(true);
    };

    const handleTransitionEnd = (e) => {
        if (e.target !== e.currentTarget) return;
        if (e.propertyName !== "width") return;
        setShowLeftArrow(isColapsed);
        setIsAnimating(false);
        if (!isDragging) onAsideTransitionEnd();
        
    };

    const showPanel = (view) => {
        setPanelView(view);
        if (isColapsed || (view === panelView) ) handleToggle();
    };


    return (
        <LayoutContext.Provider value={ {panelView, showPanel, handleToggle, isColapsed} }>
            <div className={`grid grid-cols-[1fr_auto] gap-0 w-screen h-screen overflow-hidden`}>
                <div className="relative">
                    {children}
                </div>
                <aside className={`h-screen relative bg-[#212121] shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)] transition-all ${isDragging ? "duration-0" : "duration-700"}`}
                        style={{ width: `${asideWidth}`}}
                        onTransitionEnd={handleTransitionEnd}>
                        
                    <button
                        className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 text-xl rounded-full flex justify-center items-center w-9 h-9 bg-gray-600 
                                    shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)] cursor-pointer z-10 transition-transform duration-300 hover:scale-120 will-change-transform`}
                        aria-label="Alterna visualizacion de panel lateral"
                        onClick={handleToggle}
                        disabled={isAnimating}
                    >
                    {String.fromCodePoint(showLeftArrow ? 8592 : 8594)} 
                    </button>
                    {/* div para detectar borde izq del aside de forma consistente*/}
                    <div 
                        onMouseDown={handleMouseDown}  
                        className={`absolute w-4 h-full -translate-x-1/2 left-0 border-white ${isColapsed ? "" : "cursor-col-resize"} z-5`}> 
                    </div>
                    {/* min-w-[30vw] asegura que el colapsado + difuminado sea en bloque*/}
                    <div className={`relative min-w-[30vw] h-full text-pretty overflow-x-hidden overflow-y-auto transition-[opacity] 
                                        ${isColapsed ? "opacity-0 duration-300" : "opacity-100 duration-700 delay-300" } 
                                        [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_transparent]`}
                        inert={isColapsed}
                    >
                        <div className={`grid max-w-[30vw] gap-0 overflow-hidden`}>
                            {aside}
                        </div>
                    </div>
                </aside>
            </div>
        </LayoutContext.Provider>
    );
}






export default RootsflowLayout;
