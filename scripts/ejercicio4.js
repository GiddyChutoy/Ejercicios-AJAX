window.addEventListener("load", () => {
    document.getElementById("form").addEventListener("submit", pedirAnimales, false);
}, false);

function pedirAnimales(event) {
    event.preventDefault();

    let tipoAnimal = document.getElementById("animales").value;
    let request = new XMLHttpRequest();
    request.onreadystatechange = mostrarDatosAnimales;
    request.open("GET", "http://localhost:3000/animales?Tipo=" + tipoAnimal, true);
    request.send();
}

function mostrarDatosAnimales() {
    if (this.readyState == 4 && this.status == 200) {
        let animales = JSON.parse(this.responseText);
        let contenedor = document.getElementById("datosAnimales");
        animales.forEach(animal => {
            let parrafoAnimal = document.createElement("p");
            parrafoAnimal.innerHTML = `Nombre: ${animal.Nombre}. Rasgos: ${animal.Rasgos}.`;
            contenedor.appendChild(parrafoAnimal);
        });
    }
}