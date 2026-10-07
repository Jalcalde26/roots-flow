import calculateAge from './calculateAge.js';

export function getParents (person, people) {

    if (!person) return { father:null, mother:null };

    const father= people.find (p => p.id === person.fatherId) ?? null;
    const mother= people.find (p => p.id === person.motherId) ?? null;

    return {father, mother} ;
}
export function getSortableDate (individual) {
    new Date(individual.birthDate ?? "3000-01-01")
};

export function getSiblings (person, people) {

    if (!person) return [];

    const {father, mother} = getParents(person, people);
    // Unificamos Ids de los hermanos evitando duplicaciones
    const siblingIds = new Set( [...(father?.childrenIds ?? []), ...(mother?.childrenIds ?? []) ] );
    //Early return si no tiene hermanos
    if (siblingIds.size === 0 ) return [];

    const siblings = Array.from(siblingIds)
                    .map( id => people.find( p => p.id === id))
                    .filter (p => p && p.id !== person.id);

    // Ordenamos de mayor a menor.
    // Si fechaNacimiento = {} --> menor.
    const getSortableDate = (individual) => new Date(individual.birthDate ?? "3000-01-01");
    siblings.sort( (a,b) => getSortableDate(a) - getSortableDate(b) );

    return siblings;
}

export function getGrandparents (person, people) {

    if (!person) return { paternalGrandfather: null, paternalGrandmother: null, maternalGrandfather: null, maternalGrandmother: null }

    const {father, mother} = getParents(person, people);

    const paternalGrandfather = people.find ( p => p.id === father?.fatherId) ?? null;
    const paternalGrandmother = people.find ( p => p.id === father?.motherId) ?? null;
    const maternalGrandfather = people.find ( p => p.id === mother?.fatherId) ?? null;
    const maternalGrandmother = people.find ( p => p.id === mother?.motherId) ?? null;

    return {paternalGrandfather, paternalGrandmother, maternalGrandfather, maternalGrandmother}
}

export function getAuntsAndUncles (person, people) {

    if (!person) return { paternalAuntsAndUncles: [], maternalAuntsAndUncles: []}

    const { father, mother } = getParents(person, people);

    const paternalAuntsAndUncles = getSiblings(father, people);
    const maternalAuntsAndUncles =  getSiblings(mother, people);

    return { paternalAuntsAndUncles, maternalAuntsAndUncles };
};

export function getChildren (person, people) {
    if (!person || !people) return [];
    const children = person.childrenIds
        .map(id => people.find( p => p.id === id))
        .filter(Boolean);
        // ordenación mayor a menor
    children.sort((a,b) => calculateAge(b.birthDate, b.deathDate) - calculateAge(a.birthDate, a.deathDate));

    return children;
};