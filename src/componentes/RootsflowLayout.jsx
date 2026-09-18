import 'family-chart/styles/family-chart.css';
import '../index.css';
import { useState, useEffect, useRef } from 'react';
import { cloneElement } from "react";

function RootsflowLayout ({ children, aside, onAsideTransitionEnd }) {

    const [isColapsed, setIsColapsed] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [asideWidth, setAsideWidth] = useState("30vw");
    const asideWidthRef = useRef(asideWidth);
    const [showContent, setShowContent] = useState(!isColapsed);

    

    useEffect(() => {
        if (!isDragging) return;
        
        document.body.style.userSelect = "none";
        

        function handleMouseMove(e) {
            const newWidth = document.documentElement.clientWidth - e.clientX;
            asideWidthRef.current = newWidth;
            console.log(newWidth);

            if (newWidth >= document.documentElement.clientWidth / 2) {
                setAsideWidth(`50vw`);
                return;
            }

            if (newWidth <= document.documentElement.clientWidth * 0.3) {
                setAsideWidth(`30vw`);        
                return;
            }

            setAsideWidth(`${newWidth}px`);               
        };

        function handleMouseUp() {

            setIsDragging(false);
            if (asideWidthRef.current <= 24) {
                setIsColapsed(true);
                setShowLeftArrow(true);
            }
            if (asideWidthRef.current >= 24) {
                setIsColapsed(false);
                setShowLeftArrow(false);
            }
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

    useEffect(() => {
        if (isColapsed) {
            setShowContent(false); // se oculta al instante
        } else {
            const timer = setTimeout(() => setShowContent(true), 200);
            return () => clearTimeout(timer);
        }
    }, [isColapsed]);



    function handleMouseDown (e) {
        e.preventDefault();
        if (isColapsed) return;
        setIsDragging(true);
    };

    const handleToggle = () => {
        // Usamos una variable local para lidiar con la asincronia del estado y no leer el estado desactualizado
        const newIsColapsed = !isColapsed;
        setIsColapsed(newIsColapsed);
        setAsideWidth(newIsColapsed ? "1.5rem" : "30vw");
    };

    const asideWithProps = cloneElement(aside, { onClose: handleToggle });

    const handleTransitionEnd = (e) => {
        if (e.propertyName !== "width") return;
        setShowLeftArrow(isColapsed);
        if (!isDragging) onAsideTransitionEnd();
    };


    return (
        <div className={`grid grid-cols-[1fr_auto] gap-0 w-screen h-screen overflow-hidden font-roboto `}>
            <div className="relative">
                {children}
            </div>
            <aside className={`h-screen relative bg-[#212121] shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)] transition-all ${isDragging ? "duration-0" : "duration-700"}`}
                    style={{ width: `${asideWidth}`}}
                    onTransitionEnd={handleTransitionEnd}>
                    
                <button
                    className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 text-xl rounded-full flex justify-center items-center w-9 h-9 bg-gray-600 shadow-[-14px_0_8px_-6px_rgba(0,0,0,0.3)] cursor-pointer z-10 transition-transform duration-400 hover:scale-120 will-change-transform`}
                    onClick={handleToggle}
                >
                {String.fromCodePoint(showLeftArrow ? 8592 : 8594)} 
                </button>
                {/* div para detectar borde izq del aside de forma consistente*/}
                <div 
                    onMouseDown={handleMouseDown}  
                    className={`absolute w-4 h-full -translate-x-1/2 left-0 border-white ${isColapsed ? "" : "cursor-col-resize"} z-5`}> 
                </div>
                <div className={` h-full overflow-y-auto transition-opacity duration-700 ${showContent ? "visible p-16 overflow-x-hidden opacity-100" : "invisible opacity-0" }`}>
                    {asideWithProps}
                </div>
            </aside>
        </div>
    );
}






export default RootsflowLayout;
