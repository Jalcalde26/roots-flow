import { useState, useRef, useEffect } from "react";
 
const LIMIT = 6;
 
function PeopleFinder ({ data, onSelect }) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const contRef = useRef(null);
 
    // cerrar al hacer clic fuera
    useEffect(() => {
        const onClickOut = (e) => {
            if (contRef.current && !contRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOut);
        return () => document.removeEventListener("mousedown", onClickOut);
    }, []);
    
    const q = query.trim().toLowerCase();
    console.log(q);
    const coincidences = q
        ? data.filter((p) =>
              `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`
                  .toLowerCase()
                  .includes(q)
          )
        : [];
 
    const results = viewAll ? coincidences : coincidences.slice(0, LIMIT);
    const remaining = coincidences.length - results.length;
 
    const selectPerson = (id) => {
        onSelect(id);
        setQuery("");
        setOpen(false);
        setViewAll(false);
    };
 
    return (
        <div ref={contRef} className="relative w-64 border border-white">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true); //sobra? hacer pruebas
                    setViewAll(false);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Buscar persona..."
                className="w-full rounded-md border border-white/10 bg-[#2a2a2a] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
            />
 
            {open && q && results.length > 0 && (
            <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-white/10 bg-[#2a2a2a] shadow-lg">
                {results.map((p) => (
                    <li
                        key={p.id}
                        onClick={() => selectPerson(p.id)}
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10"
                    >
                        {p.fotografia && (
                            <img
                                src={p.fotografia}
                                alt={`imagen de ${[p.nombre, p.apellidoPaterno, p.apellidoMaterno].filter(Boolean).join(" ")}`}
                                className="h-6 w-6 rounded-full object-cover"
                            />
                        )}
                        <span>
                            {p.nombre} {p.apellidoPaterno} {p.apellidoMaterno}
                        </span>
                    </li>
                ))}

                {remaining > 0 && (
                    <li
                        onClick={() => setViewAll(true)}
                        className="cursor-pointer px-3 py-2 text-xs text-white/60 hover:bg-white/10 hover:text-white"
                    >
                        + {remaining}
                    </li>
                )}
            </ul>
            )}
 
            {open && q && results.length === 0 && (
            <div className="absolute z-20 mt-1 w-full rounded-md border border-white/10 bg-[#2a2a2a] px-3 py-2 text-sm text-white/50">
                Sin resultados
            </div>
            )}
        </div>
    );
}
 
export default PeopleFinder;