function isDeath (fechaDefuncion){
        // una fecha de defuncion incorrecta será considerado como individuo muerto
        // null = vivo
        if (fechaDefuncion === null) return false;
        return true;
    };

export default isDeath;