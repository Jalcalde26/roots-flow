import { getParents, getSiblings, getAuntsAndUncles, getGrandparents } from './familyUtilities.js'

export default function getKinshipByMainId(mainPersonId, people){

    if (!people || !mainPersonId) return [];

    //obtenemos la personaInicial a partir del ID
    const mainPerson = people.find(p => p.id === mainPersonId) ?? null;
    if (!mainPerson) return [];

    // Creamos copias
    const peopleCopy = structuredClone(people);
    const mainPersonCopy = structuredClone(mainPerson);

    // ----- ego -----
    const siblingList = getSiblings(mainPersonCopy, peopleCopy);
    siblingList.push(mainPersonCopy);
    const siblings = siblingList
        .filter( p => p!= null)
        .map( p => ({
            id: p.id,
            kinship: "ego",
            sex: p.sex
    }));

    // ----- Primera generacion ascendente (padres y tios) ------
    const {father, mother} = getParents(mainPersonCopy, peopleCopy);
    const parents = [
        father && {id: father.id, kinship: "paternal", sex: father.sex},
        mother && {id: mother.id, kinship: "maternal", sex: mother.sex}
    ].filter(Boolean);

    const {paternalAuntsAndUncles, maternalAuntsAndUncles} = getAuntsAndUncles(mainPersonCopy, peopleCopy);
    const auntsAndUncles = [
        ...paternalAuntsAndUncles.filter(p => p != null).map(p => ({ id: p.id, kinship: "paternal", sex: p.sex })),
        ...maternalAuntsAndUncles.filter(p => p != null).map(p => ({id: p.id, kinship: "maternal", sex: p.sex}))
    ];

    // ------ segunda generacion ascendente (abuelos) --------
    const {
        paternalGrandfather,
        paternalGrandmother,
        maternalGrandfather,
        maternalGrandmother
    } = getGrandparents(mainPersonCopy, peopleCopy);

    const grandparents = [
        paternalGrandfather && {id: paternalGrandfather.id, kinship: "paternalGrandparents", sex: paternalGrandfather.sex},
        paternalGrandmother && {id: paternalGrandmother.id, kinship: "paternalGrandparents", sex: paternalGrandmother.sex},
        maternalGrandfather && {id: maternalGrandfather.id, kinship: "maternalGrandparents", sex: maternalGrandfather.sex},
        maternalGrandmother && {id: maternalGrandmother.id, kinship: "maternalGrandparents", sex: maternalGrandmother.sex}
    ].filter(Boolean);

    // ------ tercera generacion ascendente (bis-abuelos) ------

    const paternalGreatGrandparents = Object.values(getGrandparents(father, peopleCopy))
                                .filter( p => p != null)
                                .map(p => ({
                                    id: p.id,
                                    kinship: "paternal",
                                    sex: p.sex
                                }));

    const maternalGreatGrandparents = Object.values(getGrandparents(mother, peopleCopy))
                                .filter( p => p != null)
                                .map(p => ({
                                    id: p.id,
                                    kinship: "maternal",
                                    sex: p.sex
                                }));

    const greatGrandparents = [...paternalGreatGrandparents, ...maternalGreatGrandparents];

    // ------ primera generacion descendente (hijos) ------

    const childList = mainPerson.childrenIds.map ( c => peopleCopy
                        .find( p => c === p.id))
                        .filter(p => p != null);

    const children = childList.map( c => ({
                            id: c.id,
                            kinship: "children",
                            sex: c.sex
                        }));

    // ------ segunda generacion descendente (nietos) ------

    const grandchildren = childList.flatMap(c => c.childrenIds
                                        .map(childId => peopleCopy.find(pc => childId === pc.id))
                                        .filter(p => p != null)
                                        .map ( grandchild => ({
                                            id: grandchild.id,
                                            kinship: "grandchildren",
                                            sex: grandchild.sex
                                        })));

    return [...parents, ...auntsAndUncles, ...grandparents, ...greatGrandparents, ...siblings, ...children, ...grandchildren];
};