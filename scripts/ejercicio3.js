window.onload = () => {
    document.getElementById("1").addEventListener("click", pedirTareas, false);
    document.getElementById("2").addEventListener("click", pedirTarea55, false);
    document.getElementById("3").addEventListener("click", pedirTarea201, false);
    document.getElementById("4").addEventListener("click", nuevaTarea, false);
    document.getElementById("5").addEventListener("click", modificarTarea76, false);
    document.getElementById("6").addEventListener("click", eliminarTarea32, false);
};

function pedirTareas() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = mostrarTareas;
    request.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    request.send();
}

function mostrarTareas() {
    if (this.readyState == 4 && this.status == 200) {
        let datos = JSON.parse(this.responseText);
        let contenedor = document.getElementById("contenedor1");
        datos.forEach(element => {
            let parrafoDato = document.createElement("p");
            parrafoDato.innerHTML = `Usuario: ${element.userId}. Tarea: ${element.id}.`;
            contenedor.appendChild(parrafoDato);
        });
    }
}

function pedirTarea55() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = verDatosTarea55;
    request.open("GET", "https://jsonplaceholder.typicode.com/todos/55", true);
    request.send();
}

function verDatosTarea55() {
    if (this.readyState == 4 && this.status == 200) {
        let tarea = JSON.parse(this.responseText);
        let contenedor = document.getElementById("contenedor2");
        let parrafoDato = document.createElement("p");
        parrafoDato.innerHTML = `Usuario: ${tarea.userId}. Tarea: ${tarea.id}.`;
        contenedor.appendChild(parrafoDato);
        parrafoDato = document.createElement("p");
        parrafoDato.innerHTML = `Título: ${tarea.title}. Terminada: ${tarea.completed}.`;
        contenedor.appendChild(parrafoDato);
    }
}

function pedirTarea201() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = verDatosTarea201;
    request.open("GET", "https://jsonplaceholder.typicode.com/todos/201", true);
    request.send();
}

function verDatosTarea201() {
    if (this.readyState == 4) {
        let tarea = JSON.parse(this.responseText);
        let contenedor = document.getElementById("contenedor3");
        let parrafoDato = document.createElement("p");
        if (this.status == 200) {
            parrafoDato.innerHTML = `Usuario: ${tarea.userId}. Tarea: ${tarea.id}.`;
            contenedor.appendChild(parrafoDato);
            parrafoDato = document.createElement("p");
            parrafoDato.innerHTML = `Título: ${tarea.title}. Terminada: ${tarea.completed}.`;
            contenedor.appendChild(parrafoDato);
        } else {
            parrafoDato.innerHTML = `Se ha producido un error: ${this.status}`;
            contenedor.appendChild(parrafoDato);
        }
    }
}

function nuevaTarea() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = resultadoNuevaTarea;
    request.open("POST", "https://jsonplaceholder.typicode.com/todos", true);
    request.setRequestHeader("Content-Type", "application/json");
    let datosPeticion = JSON.stringify({ "userId": 3, "title": 'Nueva Tarea', "completed": 'false' });
    request.send(datosPeticion);
}

function resultadoNuevaTarea() {
    if (this.readyState == 4 && this.status == 201) {
        let tarea = JSON.parse(this.responseText);
        let contenedor = document.getElementById("contenedor4");
        let parrafoDato = document.createElement("p");
        parrafoDato.innerHTML = `Id nueva tarea: ${tarea.id}. Título: ${tarea.title}`;
        contenedor.appendChild(parrafoDato);
    }
}

function modificarTarea76() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = resultadoModificacion;
    request.open("PUT", "https://jsonplaceholder.typicode.com/todos/76", true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    let datosPeticion = JSON.stringify({ "id": 76, "userId": 3, "title": "Tarea Modificada", "completed": "true" });
    request.send(datosPeticion);
}

function resultadoModificacion() {
    if (this.readyState == 4 && this.status == 200) {
        let tarea = JSON.parse(this.responseText);
        let contenedor = document.getElementById("contenedor5");
        let parrafoDato = document.createElement("p");
        parrafoDato.innerHTML = `Id tarea: ${tarea.id}. Nuevo título: ${tarea.title}`;
        contenedor.appendChild(parrafoDato);
    }
}

function eliminarTarea32() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = resultadoBorrado;
    request.open("DELETE", "https://jsonplaceholder.typicode.com/todos/32", true);
    request.send();
}

function resultadoBorrado() {
    if (this.readyState == 4 && this.status == 200) {
        let contenedor = document.getElementById("contenedor6");
        let parrafoDato = document.createElement("p");
        parrafoDato.innerHTML = `Tarea borrada.`;
        contenedor.appendChild(parrafoDato);
    }
}