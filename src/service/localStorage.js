// Que esta función devuelva un valor por defecto es una cómoda manera de trabajar, así esta comprobación no la tenemos que hacer en App.js
function get(variable, valorPorDefecto) {
    if( localStorage.getItem(variable) === null ) {
      return valorPorDefecto;
    }
    else {
      return JSON.parse(localStorage.getItem(variable));
    }
  }
  
  // Función que guarda una propiedad y su valor en el local storage
  function set(variable, valor) {
    localStorage.setItem(variable, JSON.stringify(valor));
  }
  
  // Función que nos indica si una variable está ya guardada en el localStorage
  function includes(variable) {
    return localStorage.getItem(variable) !== null;
  }
  
  // Función que nos indica si una variable NO está presente en el localStorage
  function notIncludes(variable) {
    return localStorage.getItem(variable) === null;
  }
  
  // Función que borra una propiedad del local storage
  const remove = (key) => {
    localStorage.removeItem(key);
  };
  
  // Función que limpia todo el local storage
  const clear = () => {
    localStorage.clear();
  };
  
  const ls = {get, set, includes, notIncludes, remove, clear};

// Todo exportamos el obj para que pueda ser usado desde APP
export default ls;