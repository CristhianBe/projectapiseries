

import mifuncion, { HELLO } from "./modules/modulo.js";
import { mostrarUsuarios, agregarListeners } from "./modules/tasks.js";

console.log(HELLO);
console.log(mifuncion());

//const nuevoArreglo = data.users.filter((user) => user.age > 25);

agregarListeners();
mostrarUsuarios();

async function cargarUsuarios() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode8.com/users");
        const usuarios = await respuesta.json();

        console.log(respuesta);
        console.log(usuarios);
    }catch(err){
        console.log("ocurrió un error en el llamado a la API");
    }
}

cargarUsuarios();


