function findBrokenRefs(datum, visited = new Set(), data) {
            const r = datum.rels;
            const ids = [...(r.parents ?? []), ...(r.spouses ?? []), ...(r.children ?? [])].filter(Boolean);
            ids.forEach(id => {
                if (visited.has(id)) return;
                visited.add(id);
                const person = data.find(d => d.id === id);
                if (!person) {
                    console.log("Referencia rota:", id, "citada por", datum.id);
                    return;
                }
                findBrokenRefs(person, visited);
            });
        };


export default findBrokenRefs;