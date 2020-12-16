window.onload = () => {
    document.getElementById("botonPeticion").addEventListener("click", realizarPeticion, false);
};

function realizarPeticion() {

    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url + "/1") 
        .then(response => response.json())
        .then(datosUsuario => console.log(datosUsuario))
        .catch(error => console.error(error));
}