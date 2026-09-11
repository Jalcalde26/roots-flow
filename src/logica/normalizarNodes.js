import { getHermanos } from "./familyUtilities";
import treeDataJSON from '../data/family-tree.json';

export default normalizarNodes;
// 1 PASO -> IMPLEMENTAR FAMILIA BASICA (SIN DIVORCIOS, PADRASTROS, ETC...)
function normalizarNodes (array) { //aportar array plano con las personas a renderizar
    const copiaArray = structuredClone(array);
    const nodes = copiaArray.map(p => ({
        id: p.id,
        gender: p.sexo === "m" ? "female" : "male",
        spouses: [{id: p.parejasId, type: "married"}], 
        siblings: getHermanos(p, treeDataJSON).map( h => ({
            id: h.id,
            type: "blood"
        })),
        parents: [
            {id: p.padreId, type: "blood"},
            {id: p.madreId, type: "blood"}
        ],
        children: p.hijosIds.map(h =>({
            id: h,
            type: "blood"
        }))
    }))

    return nodes;
};

/* 
{
    id: "1",
    gender: "male",
    spouses: [],
    siblings: [],
    parents: [],
    children: [
        { id: "2", type: "blood" },
        { id: "3", type: "blood" }
    ]
}
*/