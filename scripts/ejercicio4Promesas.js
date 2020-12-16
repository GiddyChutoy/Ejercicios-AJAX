window.addEventListener("load", () => {
    document.getElementById("form").addEventListener("submit", manejarEventoSubmit, false);
}, false);

function manejarEventoSubmit(event) {
    event.preventDefault();
    let tipoAnimal = document.getElementById("animales").value;

    pedirAnimales(tipoAnimal)
    .then((datosAnimales) => {
        let contenedor = document.getElementById("datosAnimales");
        datosAnimales.forEach(animal => {
            let parrafoAnimal = document.createElement("p");
            parrafoAnimal.innerHTML = `Nombre: ${animal.Nombre}. Rasgos: ${animal.Rasgos}.`;
            contenedor.appendChild(parrafoAnimal);
        });
    })
    .catch( (error) => {
        let contenedor = document.getElementById("datosAnimales");
        let parrafoAnimal = document.createElement("p");
            parrafoAnimal.innerHTML = error;
            contenedor.appendChild(parrafoAnimal);
    });
}

function pedirAnimales(tipoAnimal) {
    return new Promise ((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/animales?Tipo=" + tipoAnimal, true);
        request.send();
        request.addEventListener("load",() => {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject("Actualmente no hay animales de ese tipo.");
            }
        });
        request.addEventListener('error', () => reject('Error en la petición HTTP'));
    });
}