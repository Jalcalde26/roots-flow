function isDead (deathDate){
        // una fecha de defuncion incorrecta será considerado como individuo muerto
        // null = vivo
        if (deathDate === null) return false;
        return true;
    };

export default isDead;