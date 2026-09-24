import { useState, useRef, useEffect } from "react";

const LIMIT = 3;

function PeopleFinder ({ data, onSelect, isSearchOpen}) {
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

    const fullName = (p) => [p.nombre, p.apellidoPaterno, p.apellidoMaterno].filter(Boolean).join(" ");

    const q = normalizeText(query);
    
    const coincidences = q
        ? data.filter((p) =>
            normalizeText(fullName(p))
            .includes(q))
        : [];
    // Los resultados son las coincidences mostradas
    const results = viewAll ? coincidences : coincidences.slice(0, LIMIT);
    // si hay mas coincidencias que resultados mostrados, aparecerá un boton con el valor de remaining
    const remaining = coincidences.length - results.length;
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
            className={`relative min-w-0 max-w-60 border rounded-lg transition-all durante-500  ${isSearchOpen ? "border-[#DCDCDC] opacity-100" : "border-transparent overflow-hidden"}`}
            onTransitionEnd={(e) => {
                if (e.target === e.currentTarget && isSearchOpen) {
                inputRef.current?.focus();
                };
            }}
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
                placeholder="Encuentra a tu familiar..."
                className="w-full bg-[#4A5565] px-8 py-3 rounded-lg text-sm text-white outline-none placeholder:text-white/70"
            />

            {open && q && results.length > 0 && (
            <ul className={`absolute max-h-46 left-0 flex flex-col gap-[1px] ${isOpen ? "" : "hidden"} border border-[#DCDCDC] w-54 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_transparent] rounded-md bg-[#4A5565]
                    shadow-[0px_0px_14px_-10px_rgba(0,0,0,0.8)]`}>
                {results.map( (p, i) => (
                    <li
                        key={p.id}
                        ref={(element) => (itemRefs.current[i] = element)}
                        tabIndex={0}
                        onFocus={() => setActiveIndex(i)}
                        onMouseEnter={() => setActiveIndex(i)}
                        onKeyDown={(e) => handleItemKeyDown(e, i, () => selectPerson(p.id))}
                        onClick={() => selectPerson(p.id)}
                        className={`flex gap-4 ${i === activeIndex ? "bg-white/10" : ""} rounded-sm cursor-pointer items-center px-2 py-1 outline-none text-sm text-white`}
                    >
                        {p.fotografia ? (
                            <img
                                src={p.fotografia}
                                alt={`imagen de ${[p.nombre, p.apellidoPaterno, p.apellidoMaterno].filter(Boolean).join(" ")}`}
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                        <div className="w-9 h-9 flex items-center justify-center text-neutral-300">
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
                        className={`cursor-pointer px-2 py-3 rounded-sm text-sm text-white/60 outline-none ${activeIndex === results.length
                            ? "bg-white/10 text-white"
                            : "text-white/60"
                        }`}
                    >
                        + {remaining}
                    </li>
                )}
            </ul>
            )}

            {isOpen && q && results.length === 0 && (
            <div className={`absolute text-white/70 text-center px-2 py-3 border border-[#DCDCDC] w-54 text-sm rounded-md bg-[#4A5565]
                    shadow-[0px_0px_14px_-10px_rgba(0,0,0,0.8)]`}>
                Sin resultados
            </div>
            )}
        </div>
    );
}

export default PeopleFinder;