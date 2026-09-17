 import { useState } from "react";

/**
 * PersonAside
 * Panel lateral con la ficha biográfica de la persona enfocada en el árbol.
 * Se expande hasta 50vw al hacer click en "Expandir".
 *
 * Uso:
 * <PersonAside
 *   photoUrl="/fotos/rafael.jpg"
 *   name="Rafael Alcalde Lopez"
 *   profession="Arquitecto"
 *   birthDate="06 jul 1966"
 *   deathDate={null} // o "12 mar 2040" si ha fallecido
 *   birthPlace="Ceutí, Murcia"
 *   bio={[
 *     "Creció en el barrio de Santa Catalina...",
 *     "Es conocido por la restauración..."
 *   ]}
 *   stats={{ children: 3, age: 58, photos: 6 }}
 *   spouse={{ name: "Pilar Molina Legaz", onClick: () => {} }}
 * />
 */
    function BiographyPanel({persona}) {

        /*const photoUrl = person.fotografia,
        const name = personas,
        profession,
        birthDate,
        deathDate,
        birthPlace,
        bio = [],
        stats,
        spouse,
        onClose,*/

        const [expanded, setExpanded] = useState(false);

        return (
            <>
            {/* barra superior */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-wide text-neutral-500">
                Ficha personal
                </span>
                <div className="flex items-center gap-3">
                <button
                    onClick={() => setExpanded((v) => !v)}
                    aria-label={expanded ? "Contraer panel" : "Expandir panel"}
                    className="text-neutral-500 hover:text-neutral-200 transition-colors"
                >
                    {expanded ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 3v4a2 2 0 0 1-2 2H3m18 0h-4a2 2 0 0 1-2-2V3m0 18v-4a2 2 0 0 1 2-2h4M3 15h4a2 2 0 0 1 2 2v4" />
                    </svg>
                    ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    )}
                </button>
                {onClose && (
                    <button
                    onClick={onClose}
                    aria-label="Cerrar panel"
                    className="text-neutral-500 hover:text-neutral-200 transition-colors"
                    >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                    </button>
                )}
                </div>
            </div>

            {/* contenido: en modo expandido pasa a 2 columnas */}
            <div className={expanded ? "grid grid-cols-2 gap-10" : ""}>
                <div>
                {/* foto */}
                <div className="w-full h-56 rounded-2xl bg-neutral-800 overflow-hidden mb-6">
                    {person.fotografia ? (
                    <img
                        src={person.fotografia}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-600">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                        </svg>
                    </div>
                    )}
                </div>

                {/* profesión */}
                {profession && (
                    <p className="text-[13px] tracking-wide text-neutral-500 mb-1.5">
                    {profession}
                    </p>
                )}

                {/* nombre */}
                <h1 className="font-serif text-3xl font-normal leading-tight text-neutral-100 mb-2.5">
                    {name}
                </h1>

                {/* fechas + lugar */}
                <p className="text-sm text-neutral-400 mb-5">
                    {birthDate} — {deathDate || "presente"}
                    {birthPlace ? ` · ${birthPlace}` : ""}
                </p>

                {/* franja de stats */}
                {stats && (
                    <div className="flex gap-6 py-4 border-t border-b border-neutral-800 mb-6">
                    {stats.children != null && (
                        <Stat value={stats.children} label="Hijos" />
                    )}
                    {stats.age != null && <Stat value={stats.age} label="Años" />}
                    {stats.photos != null && (
                        <Stat value={stats.photos} label="Fotos" />
                    )}
                    </div>
                )}
                </div>

                <div>
                {/* biografía */}
                {bio.map((paragraph, i) => (
                    <p
                    key={i}
                    className={`font-serif text-[15px] leading-[1.75] mb-4 ${
                        i === 0 ? "text-neutral-200" : "text-neutral-400"
                    }`}
                    >
                    {paragraph}
                    </p>
                ))}

                {/* cónyuge */}
                {spouse && (
                    <div className="flex items-center gap-2 text-sm text-neutral-400 mt-6">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500">
                        <path d="M20.8 8.6c0 4.4-8.8 10.4-8.8 10.4S3.2 13 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" />
                    </svg>
                    Casado con {spouse.name}
                    {spouse.onClick && (
                        <>
                        <span className="text-neutral-600">·</span>
                        <button
                            onClick={spouse.onClick}
                            className="text-neutral-300 hover:text-neutral-100 underline underline-offset-2"
                        >
                            ver ficha
                        </button>
                        </>
                    )}
                    </div>
                )}
                </div>
            </div>
            </>
        );
        }

        function Stat({ value, label }) {
        return (
            <div>
            <p className="text-xl font-medium text-neutral-100">{value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
            </div>
        );
        }

    export default BiographyPanel;