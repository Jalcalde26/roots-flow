import isValidDate from './isValidDate.js'

const GENDER_BY_SEX = { female: "F", male: "M" }; // family-chart: "F" | "M" | undefined (card-genderless)

export default normalizeData;

function normalizeData (people) { //aportar array plano con las personas a renderizar
    const peopleCopy = structuredClone(people);
    const nodes = peopleCopy.map(p => ({
        id: p.id,
        data: {
            "firstName": p.firstName,
            "lastName": [p.paternalSurname, p.maternalSurname].filter(Boolean).join(" "),
            "birthday": `Nac. ${isValidDate(p.birthDate) ? p.birthDate.split("-")[0] : "Desconocido"}`,
            avatar: p.photo,
            gender: GENDER_BY_SEX[p.sex],
            fullBirthDate: isValidDate(p.birthDate) ? p.birthDate : "",
            weddingDate: isValidDate(p.marriageDate) ? p.marriageDate : null
        },
        rels: {
            spouses: p.spouseIds ?? [], //solo incluimos una pareja por ahora
            children: p.childrenIds ?? [], // solo hijos biologicos por ahora
            parents: [p.fatherId, p.motherId].filter(Boolean) //solo incluimos padres biologicos por ahora
        }
    }))

    return nodes;
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