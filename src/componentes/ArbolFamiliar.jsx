import * as f3 from 'family-chart';
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import normalizarData from "../logica/normalizarData";
import 'family-chart/styles/family-chart.css';
import '../index.css';
import getParentescoMainId from "../logica/parentesco.js";


function ArbolFamiliar ({ personas, mainId, personaOnClick}, ref) {
    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const listadoParentescoRef = useRef(null);
    const esPrimerRender = useRef(true); 

    function resetView () {
        if (!chartRef.current) return;
        chartRef.current.updateTree({ tree_position: 'fit' });
        console.log("vista reseteada");
    };

    useImperativeHandle(ref, () => ({
        resetView,
    }));

    useEffect( () => {

        if (!containerRef.current) return;

        const data = normalizarData(personas);
        console.log(data);
        listadoParentescoRef.current = getParentescoMainId(mainId, personas);

        const chart = f3.createChart(containerRef.current, data)
            .setAncestryDepth(3)
            .setProgenyDepth(2);
            
        chart.setCardHtml()
            .setCardDisplay([["first name","last name"],["birthday"]])
            .setOnCardClick((e, d) => {
                console.log("click detectado", d)
                personaOnClick(d.data.id); // onPersonaClick = setPersonaInicialId (app.jsx)
            })

            // Personalización cards
            .setOnCardUpdate(function (d) {
                const parentesco = listadoParentescoRef.current.find(p => p.id === d.data.id)?.parentesco ?? "default";
                const sexo = listadoParentescoRef.current.find(p => p.id === d.data.id)?.sexo ?? "default";
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

            listadoParentescoRef.current = getParentescoMainId(mainId, personas);

            chartRef.current.updateMainId(mainId); 
            chartRef.current.updateTree();

        }, [mainId]); // Se ejecuta cada vez que mainId cambia

        return( 
            <>
                <div
                    className="f3"
                    id="FamilyChart"
                    ref={containerRef}
                    style={{ width: '100%', height: '100%', margin: 'auto', backgroundColor: 'rgb(33,33,33)', color: '#fff' }}
                />
                <button 
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 text-md border rounded-md py-2 px-4 bg-slate-600 cursor-pointer z-10 transition-transform duration-500 hover:scale-110 will-change-transform hover:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.8)]" 
                    onClick={resetView}>
                    Centrar vista
                </button>
            </>
        );
    };

    export default forwardRef(ArbolFamiliar);

    // TO DO: boton colapsar + centrado al finalizar animacion, Separar responsabilidades (layout web y arbol -> recuadro en negro), funcion arrastrar seccion bibliografia