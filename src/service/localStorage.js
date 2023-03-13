// fichero src/service/localStorage.js

// Funcion que obtiene una propiedad del LS, si esta no existe porque es la primera vez que la usuaria entra en la pag, la funcion devuelve el valor de defaultValue
// Que esta funcion devuelva un valor por defecto es una comoda manera de trabajr, asi esta comprobacion no la tenemos que hacer en App,js
const get =(key, defaultValue) => {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) {
        return defaultValue;
    } else {
        return JSON.parse(localStorageData);
    }
};

// Funcion que guarde una prop y su valor en el localStorage
const set = (key , value) => {
    const localStorageData = JSON.stringify(value);
    localStorage.setItem(key, localStorageData);
};

// funcion que borra una prop del localStorage
const remove = (key) => {
    localStorage.removeItem(key);
};

// funcion que limpia todo el localStorage
const clear = () => {
    localStorage.clear();
};

//Creamos un obj temporal, que es el que queremos exportar, este tiene: 
// ? - prop get cuyo valor es la funcion get 
// ? - prop set cuyo valor es la funcion set
// ? - prop remove cuyo valor es la funcion remove
// ? - prop clear cuyo valor es la funcion clear

const objectToExport = {
    get: get,
    set: set,
    remove: remove,
    clear: clear,
};

// Todo exportamos el obj para que pueda ser usado desde APP
export default objectToExport;