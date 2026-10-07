import { useState, useRef, useEffect } from "react";

const LIMIT = 3;

function PeopleFinder ({ data, onSelect, isSearchOpen, shouldFocus, isDarkMode}) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const contRef = useRef(null);
    const inputRef = useRef(null);
    const itemRefs = useRef([]);

    // cerrar al hacer clic fuera
    useEffect(() => {
        const onClickOut = (e) => {
            if (contRef.current && !contRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("pointerdown", onClickOut);
        return () => document.removeEventListener("pointerdown", onClickOut);
    }, []);

    const normalizeText = (text) =>
        text
        .trim()
        .toLowerCase()
        .replace(/ñ/g, "\u0001")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const fullName = (p) => [p.firstName, p.paternalSurname, p.maternalSurname].filter(Boolean).join(" ");

    const q = normalizeText(query);
    
    const matches = q
        ? data.filter((p) =>
            normalizeText(fullName(p))
            .includes(q))
        : [];
    matches.sort( (a,b) => { //localeCompare para respetar normas de escritura españolas
        return (
            (a.firstName ?? "").localeCompare(b.firstName ?? "", "es", {sensitivity: "base"}) ||
            (a.paternalSurname ?? "").localeCompare(b.paternalSurname ?? "", "es", {sensitivity: "base"}) ||
            (a.maternalSurname ?? "").localeCompare(b.maternalSurname ?? "", "es", {sensitivity: "base"})
        );
    });
    // Los resultados son las coincidences mostradas
    const results = viewAll ? matches : matches.slice(0, LIMIT);
    // si hay mas coincidencias que resultados mostrados, aparecerá un boton con el valor de remaining
    const remaining = matches.length - results.length;
    const hasMore = remaining > 0;
    // lastIndex condicional. Si hay coincidencias ocultas + 1 para poder acceder al boton que los despliega. 
    const lastIndex = results.length - 1 + (hasMore ? 1 : 0);

    // mantiene visible el elemento activo dentro del ul con scroll
    useEffect(() => {
        itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    // Al seleccionar un valor, cambia el id (render completo de la app) y se resetan los valores.
    const selectPerson = (id) => {
        onSelect(id);
        setQuery("");
        setIsOpen(false);
        setViewAll(false);
        setActiveIndex(0);
    };

    useEffect( () => {
        if (isSearchOpen) return;
        setQuery("");
        setIsOpen(false);
        setViewAll(false);
        setActiveIndex(0);
    }, [isSearchOpen]);

    useEffect(() => { // Cuando este abierto el buscador && haya acabado la animación -> foco al input
        if (shouldFocus) inputRef.current?.focus();
    }, [shouldFocus]);

    

    // teclado en el input: el foco se queda aquí y solo se mueve el resaltado
    const handleInputKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!isOpen) setIsOpen(true);
            setActiveIndex((i) => Math.min(i + 1, lastIndex));
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        }
        if (e.key === "Enter") {
            if (hasMore && activeIndex === results.length) setViewAll(true);
            if (results[activeIndex]) selectPerson(results[activeIndex].id);
        }
    };

    // teclado en un li: las flechas mueven el foco real
    const handleItemKeyDown = (e, i, action) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            action();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            itemRefs.current[Math.min(i + 1, lastIndex)]?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (i === 0) inputRef.current?.focus();
            else itemRefs.current[i - 1]?.focus();
        }
    };
    

    return (
        <div 
            ref={contRef}
            className={`min-w-0 w-52`} 
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    setIsOpen(false);
                    inputRef.current?.blur();
                    contRef.current?.blur();
                }
            }}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
            }}
            inert={!isSearchOpen}
            >
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true); //sobra? hacer pruebas
                    setViewAll(false);
                    setActiveIndex(0);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleInputKeyDown}
                spellCheck={false}
                placeholder="Encuentra a tu familiar..."
                className={`w-47 h-full pl-4 py-3 text-md ${isDarkMode ? `text-svg placeholder:text-white/70` : `text-lightFont placeholder:text-neutral-500`} outline-none  placeholder:text-sm`}
            />

            {isOpen && q && results.length > 0 && (
            <ul className={`absolute w-54 max-h-51 left-12 top-15 flex flex-col gap-[1px] border px-2 py-2 overflow-y-auto [scrollbar-width:thin]
                z-0 rounded-md
                ${isDarkMode
                    ? `text-svg border-white/40 [scrollbar-color:rgba(255,255,255,0.3)_transparent] bg-button`
                    : `text-lightFont border-neutral-200 [scrollbar-color:rgba(0,0,0,0.2)_transparent] bg-white shadow-lg shadow-neutral-900/10`}`}>
                {results.map( (p, i) => (
                    <li
                        key={p.id}
                        ref={(element) => (itemRefs.current[i] = element)}
                        tabIndex={0}
                        onFocus={() => setActiveIndex(i)}
                        onMouseEnter={() => setActiveIndex(i)}
                        onKeyDown={(e) => handleItemKeyDown(e, i, () => selectPerson(p.id))}
                        onClick={() => selectPerson(p.id)}
                        className={`flex gap-4 rounded-sm cursor-pointer items-center px-2 py-1 outline-none text-sm
                                ${i === activeIndex 
                                    ? (isDarkMode ? `bg-white/10 text-white` : `bg-neutral-100 text-lightFont`)
                                    : (isDarkMode ? `text-white/80 ` : `text-neutral-600`)
                                }`}
                    >
                        {p.photo ? (
                            <img
                                src={p.photo}
                                alt={`imagen de ${[p.firstName, p.paternalSurname, p.maternalSurname].filter(Boolean).join(" ")}`}
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                        <div className={`w-9 h-9 flex items-center justify-center ${isDarkMode ? "text-neutral-300" : "text-neutral-400"}`}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                            </svg>
                        </div>
                        )}
                        <span>
                            {fullName(p)}
                        </span>
                    </li>
                ))}

                {remaining > 0 && (
                    <li
                        tabIndex={0}
                        onFocus={() => setActiveIndex(lastIndex)}
                        onMouseEnter={() => setActiveIndex(lastIndex)}
                        onClick={() => setViewAll(true)}
                        onKeyDown={handleInputKeyDown}
                        className={`cursor-pointer pl-4 py-3 rounded-sm text-sm outline-none 
                            ${activeIndex === results.length
                                ? (isDarkMode ? "bg-white/10 text-white" : "bg-neutral-100 text-lightFont")
                                : (isDarkMode ? "text-white/60" : "text-neutral-500")
                            }`}
                    >
                        + {remaining}
                    </li>
                )}
            </ul>
            )}

            {isOpen && q && results.length === 0 && (
            <div className={`absolute w-54 left-12 top-15 text-center px-4 py-5 border text-sm rounded-md
                ${isDarkMode
                    ? `text-svg text-white/60 border-white/40 bg-button`
                    : `text-neutral-500 border-neutral-200 bg-white shadow-lg shadow-neutral-900/10`}`}>
                Sin resultados
            </div>
            )}
        </div>
    );
}

export default PeopleFinder;