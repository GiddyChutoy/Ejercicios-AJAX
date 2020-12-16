window.addEventListener("load", () => {
    document.getElementById("ver").addEventListener("click", realizarAccion, false);
    document.getElementById("nuevo").addEventListener("click", realizarAccion, false);
}, false);

function realizarAccion(event) {
console.log(event);

    let url = "http://localhost:3000/animales";
    if (event.target.value == "ver") {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
                }
            })
            .then(datosAnimales => mostrarDatos(datosAnimales))
            .catch(error => console.error(error));
    } else {
        nuevoAnimal();
    }
}

function mostrarDatos(datosAnimales) {
    let parrafo = document.getElementById("animales");
    parrafo.innerHTML = "";
    datosAnimales.forEach(animal => {
        let nombre = document.createElement("span");
        nombre.innerHTML = animal.Nombre + "<br>";
        parrafo.appendChild(nombre);
    });
}

function nuevoAnimal() {
    let parrafo = document.getElementById("animales");
    parrafo.innerHTML = "";
    
    let url = "http://localhost:3000/animales";

    let datosAnimal = {
        Tipo: "Perro",
        Nombre: "Rayo",
        Observacion: "Es mayor",
        Ubicacion: "Zona de la alamedilla",
        Rasgos: "Pelo oscuro y largo, cola cortada",
        Imagen: ""
    };

    let init = {
        method: 'POST',
        body: JSON.stringify(datosAnimal),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, init)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return "Ago ha ido mal: Error HTTP:" + response.status + "(" + response.statusText + ")";
            }
        })
        .then(datosAnimal => alert(datosAnimal.Nombre + " dado de alta"))
        .catch(error => console.error(error));
}