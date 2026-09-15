import 'family-chart/styles/family-chart.css';
import '../index.css';
import { useState } from 'react';

function RootsflowLayout ({ children, onAsideTransitionEnd }) {

    const [isColapsed, setIsColapsed] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const handleToggle = () => {
        setIsColapsed(!isColapsed);
    };

    const handleTransitionEnd = (e) => {
        if (e.propertyName !== "width") return;
        setShowLeftArrow(isColapsed);
        onAsideTransitionEnd();
        console.log("animacion finalizada");
    };


    return (
        <div className={`grid grid-cols-[1fr_auto] gap-0 w-screen h-screen overflow-hidden font-roboto `}>
            <div className="relative">
                {children}
            </div>
            <aside className={`relative bg-[#212121] shadow-[-16px_0_24px_-6px_rgba(0,0,0,0.3)] transition-all duration-600 ${
                isColapsed 
                    ? "w-[1.5rem]" 
                    : "w-[30vw]"}`}
                    onTransitionEnd={handleTransitionEnd}>
                <button
                    className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 text-2xl rounded-full flex justify-center w-10 h-10 bg-gray-600 shadow-[-16px_0_24px_-6px_rgba(0,0,0,0.3)] cursor-pointer z-10 transition-transform duration-400 hover:scale-120`}
                    onClick={handleToggle}
                >
                {String.fromCodePoint(showLeftArrow ? 8592 : 8594)} 
                </button>
            </aside>
        </div>
    );
}






export default RootsflowLayout;