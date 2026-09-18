function isDeath (fechaDefuncion){
        if (fechaDefuncion === "undefined") return "Desconocido";
        if (fechaDefuncion === null) return "Presente";
        else return true; 
    };

export default isDeath;