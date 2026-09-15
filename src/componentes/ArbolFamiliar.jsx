import * as f3 from 'family-chart';
import * as d3 from 'd3';
import { useRef, useEffect } from "react";
import normalizarData from "../logica/normalizarData";
import 'family-chart/styles/family-chart.css';
import '../index.css';
import getParentescoMainId from "../logica/parentesco.js";


function aplicarColorRama(contEl, listadoParentesco) {
    if (!contEl) return;

    d3.select(contEl)
        .select('div.cards_view')
        .selectAll('.card_cont')
        .each(function (d) {
            const parentesco = listadoParentesco.find(p => p.id === d.data.id)?.parentesco ?? "default";
            const cardInner = this.querySelector('div.card-inner');
            if (!cardInner) return;

            [...cardInner.classList]
                .filter(c => c.startsWith('rama-'))
                .forEach(c => cardInner.classList.remove(c));

            cardInner.classList.add(`rama-${parentesco}`);
        });
};



function ArbolFamiliar ({ personas, mainId, personaOnClick, children }) {
    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const listadoParientescoRef = useRef(null);
    const esPrimerRender = useRef(true);

    function resetearVista () {
        if (!chartRef.current) return;
        chartRef.current.updateTree({ tree_position: 'fit' });
    }; 

    useEffect( () => {

        if (!containerRef.current) return;

        const data = normalizarData(personas);
        listadoParientescoRef.current = getParentescoMainId(mainId, personas);

        const chart = f3.createChart(containerRef.current, data)
            .setAncestryDepth(3)
            .setProgenyDepth(2);
            
        chart.setCardHtml()
            .setCardDisplay([["first name","last name"],["birthday"]])
            .setOnCardClick((e, d) => {
                console.log("click detectado", d)
                personaOnClick(d.data.id); // onPersonaClick = setPersonaInicialId (app.jsx)
            })
            .setOnCardUpdate(function (d) {
                const parentesco = listadoParientescoRef.current.find(p => p.id === d.data.id)?.parentesco ?? "default";
                const sexo = listadoParientescoRef.current.find(p => p.id === d.data.id)?.sexo ?? "default";
                const cardInner = this.querySelector('div.card-inner');

                if (!cardInner) return;
                [...cardInner.classList]
                    .filter(c => c.startsWith('rama-'))
                    .forEach(c => cardInner.classList.remove(c));
                [...cardInner.classList]
                    .filter(c => c.startsWith('sexo-'))
                    .forEach(c => cardInner.classList.remove(c));

                cardInner.classList.add(`rama-${parentesco}`);
                cardInner.classList.add(`sexo-${sexo}`);
            });

        chart.updateMainId(mainId); // mainId = personaInicialId (app.jsx)
        chart.updateTree({ initial: true });

        chartRef.current = chart;

        // FUNCION DE LIMPIEZA: se ejecuta antes del siguiente montaje (o al desmontar)
        return () => {
            if (containerRef.current) containerRef.current.innerHTML = ""; // vacia el contenedor por completo
        };
    }, []);


        useEffect( () => {

            if (esPrimerRender.current) {
                esPrimerRender.current = false;
                return;
            }

            if (!chartRef.current) return;

            listadoParientescoRef.current = getParentescoMainId(mainId, personas);

            chartRef.current.updateMainId(mainId); 
            chartRef.current.updateTree();

        }, [mainId]); // Se ejecuta cada vez que mainId cambia

        return( 
                <div className='grid grid-cols-[5fr_2fr] gap-0 w-screen h-screen font-roboto'>
                    <div className="relative">
                        <div
                            className="f3"
                            id="FamilyChart"
                            ref={containerRef}
                            style={{ width: '100%', height: '100%', margin: 'auto', backgroundColor: 'rgb(33,33,33)', color: '#fff' }}
                        />
                        <button 
                            className="absolute bottom-52 left-1/2 -translate-x-1/2 text-md border rounded-md py-2 px-4 bg-slate-600 cursor-pointer z-10 transition-transform duration-500 hover:scale-110 will-change-transform hover:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.8)]" 
                            onClick={resetearVista}>
                            Centrar vista
                        </button>
                    </div>
                    <aside className="relative border-l-4 border-slate-500 bg-slate-600">
                        <button
                            className="absolute top-1/2 -left-0 -translate-y-1/2 -translate-x-1/2 text-lg border-3 border-slate-600 rounded-full py-1 px-3 bg-[#212121] cursor-pointer z-10"
                            onClick={setColapsado}
                            >
                          X
                        </button>
                    </aside>
                </div>
        );
    };

    export default ArbolFamiliar;

    // TO DO: boton colapsar + centrado al finalizar animacion, Separar responsabilidades (layout web y arbol -> recuadro en negro), funcion arrastrar seccion bibliografia