function encontrarRefRotas(datum, visitados = new Set(), data) {
            const r = datum.rels;
            const ids = [...(r.parents ?? []), ...(r.spouses ?? []), ...(r.children ?? [])].filter(Boolean);
            ids.forEach(id => {
                if (visitados.has(id)) return;
                visitados.add(id);
                const persona = data.find(d => d.id === id);
                if (!persona) {
                    console.log("Referencia rota:", id, "citada por", datum.id);
                    return;
                }
                encontrarRefRotas(persona, visitados);
            });
        };


export default encontrarRefRotas;