import isValidDate from './isValidDate.js'

function calculateAge(birthDate, deathDate) {
    if (!isValidDate(birthDate)) return false;

    const today = new Date();
    const birth = new Date(birthDate);
    const death = new Date(deathDate);

    let age = 0;
    let month = 0;

    if (deathDate === null) {
        age = today.getFullYear() - birth.getFullYear();
        month = today.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && death.getDate() < birth.getDate())) age--;
    } else {
        age = death.getFullYear() - birth.getFullYear();
        month = death.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age--;
    };

    return age;
}

export default calculateAge;

export function calculatePetAge(pet) {
    if (pet) return calculateAge(pet.birthDate, pet.deathDate);
    return null;
};
