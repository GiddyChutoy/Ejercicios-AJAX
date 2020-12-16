window.addEventListener("load", realizarPeticion, false);

function realizarPeticion() {

    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url) 
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return "Ago ha ido mal: Error HTTP:"+response.status+"("+ response.statusText + ")";
            }
        })
        .then(datosUsuarios => mostrarDatosTablas(datosUsuarios))
        .catch(error => console.error(error));
}

function mostrarDatosTablas(datosUsuarios) {

    let tabla = document.getElementById("tabla");
    datosUsuarios.forEach(datosUsuario => {
        let fila = document.createElement("tr");
        fila.innerHTML = "<td>" + datosUsuario.name + "</td>" + "<td>" + datosUsuario.email + "</td>";
        tabla.appendChild(fila);
    });
}