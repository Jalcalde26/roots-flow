import treeDataJSON from '../data/family-tree.json';
import fechaFormateada from '../logica/fechaFormateada.js'

export default normalizarData;

function normalizarData (personas) { //aportar array plano con las personas a renderizar
    const copiaPersonas = structuredClone(personas);
    const nodos = copiaPersonas.map(p => ({
        id: p.id,
        data: {
            "firstName": p.nombre,
            "lastName": [p.apellidoPaterno, p.apellidoMaterno].filter(Boolean).join(" "),
            "birthday": `Nac. ${p.fechaNacimiento 
                                    ? p.fechaNacimiento === "undefined" 
                                          ? "Desconocido" 
                                          : p.fechaNacimiento.split("-")[0] 
                                    : "Desconocido"}`,
            avatar: p.fotografia,
            gender: p.sexo === "m" ? "F" : "M",
            fullBirthDate: p?.fechaNacimiento ? `${p.fechaNacimiento}` : "",
            weddingDate: p?.fechaMatrimonio
        },
        rels: {
            spouses: p.parejasId, //solo incluimos una pareja por ahora
            children: p.hijosIds, // solo hijos biologicos por ahora
            parents: [p.padreId, p.madreId].filter(Boolean) //solo incluimos padres biologicos por ahora
        }
    }))

    return nodos;
};

/* 
{
    "id": "0",
    "data": {
      "first name": "Agnus",
      "last name": "",
      "birthday": "1970",
      "avatar": "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
      "gender": "M"
    },
    "rels": {
      "spouses": [
        "8c92765f-92d3-4120-90dd-85a28302504c"
      ],
      "children": [
        "ce2fcb9a-6058-4326-b56a-aced35168561",
        "f626d086-e2d6-4722-b4f3-ca4f15b109ab"
      ],
      "parents": [
        "0c09cfa0-5e7c-4073-8beb-94f6c69ada19",
        "0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"
      ]
    }
  },
*/