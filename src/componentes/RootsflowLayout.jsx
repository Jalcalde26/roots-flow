import 'family-chart/styles/family-chart.css';
import '../index.css';
import { useState, useRef } from 'react';

function RootsflowLayout ({ children, onAsideTransitionEnd }) {

    const [isColapsed, setIsColapsed] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [asideWidth, setAsideWidth] = useState("w-[30vw]");
    const asideRef = useRef(null);

// COMENZAR A TRABAJAR AQUI

/* 
useEffect(() => {
    if (!isDragging) return;

    function handleMouseMove(evento) {
        // tu lógica de cálculo de nuevoWidth aquí
    }

    function handleMouseUp(evento) {
        setIsDragging(false);
        onAsideTransitionEnd();
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
}, [isDragging]);
*/

    function handleMouseDown (e) {
        setIsDragging(true);
        console.log("click");
    };

    function handleMouseUp (e) {
        const positionMouse = e.clientX;
        const viewportWidth = window.innerWidth;

        if (isDragging === true) {
            setIsDragging(false);
            setAsideWidth(`w-[${viewportWidth - positionMouse}px]`);
            onAsideTransitionEnd();            
        }

        return;
    };

    const handleToggle = () => {
        // Usamos una variable local para lidiar con la asincronia del estado y no leer el estado desactualizado
        const newIsColapsed = !isColapsed;
        setIsColapsed(newIsColapsed);
        setAsideWidth(newIsColapsed ? "w-[1.5rem]" : "w-[30vw]");
    };

    const handleTransitionEnd = (e) => {
        if (e.propertyName !== "width") return;
        setShowLeftArrow(isColapsed);
        onAsideTransitionEnd();
    };


    return (
        <div className={`grid grid-cols-[1fr_auto] gap-0 w-screen h-screen overflow-hidden font-roboto `}>
            <div className="relative">
                {children}
            </div>
            <aside className={`relative bg-[#212121] shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)] transition-all duration-600 ${asideWidth}`}
                    onTransitionEnd={handleTransitionEnd}>
                <button
                    className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 text-xl rounded-full flex justify-center items-center w-9 h-9 bg-gray-600 shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)] cursor-pointer z-10 transition-transform duration-400 hover:scale-120 will-change-transform`}
                    onClick={handleToggle}
                >
                {String.fromCodePoint(showLeftArrow ? 8592 : 8594)} 
                </button>
                {/* div para detectar borde izq del aside de forma consistente*/}
                <div 
                    ref={asideRef}
                    onMouseDown={handleMouseDown}  
                    className={`absolute w-2 h-full -translate-x-1/2 border border-white z-5`}> 
                </div>
            </aside>
        </div>
    );
}






export default RootsflowLayout;