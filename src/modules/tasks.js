
import data from "../data.json";

const usersList = document.querySelector("#users");
const taskInput = document.querySelector(".taskInput");
const taskButton = document.querySelector(".taskButton");

export function agregarListeners(){


    taskButton.addEventListener("click", (e) => {
            console.log(taskInput.value);

            // Agregar un nuevo usuario al arreglo de usuarios
            data.users.push({
                name: taskInput.value,
                age: 30
            });

        // Mostrar los usuarios actualizados
        mostrarUsuarios();
        // Limpiar el campo de entrada después de agregar el usuario
        limpiarCampoInput();
    });


}

// metodo privado
function limpiarCampoInput() {
    taskInput.value = "";
}


export function mostrarUsuarios(){
    
    // Limpiar la lista antes de mostrar los usuarios
    usersList.innerHTML = "";

    // Mostrar los usuarios en la lista
    data.users.forEach((user) =>{
    
        console.log(user.name);
        usersList.insertAdjacentHTML("beforeend", `<li>${user.name}</li>`); //mejorar esto
    
    });

}