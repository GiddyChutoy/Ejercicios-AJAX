window.onload = () => {
    document.getElementById("botonPeticion").addEventListener("click", realizarPeticionesAjax, false);

    document.getElementById("botonPeticionPost").addEventListener("click", realizarPeticionPost, false);
};

function realizarPeticionesAjax() {
    let request = new XMLHttpRequest();
    //Indicamos  la función que se va a ejecutar cada vez que 
    //cambie el estado de la petición
    request.onreadystatechange = accionEstado;
    //Se establece la comunicación con el servidor
    request.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    //Por último se envía la petición
    request.send();
}

/**
 * Función que se va a ejecutar cada vez que se produzca un cambio de estado en la petición.
 * La situación de la resupesta mas interesante de cara a ejecutar código adicional:
 *      readyState = 4 y
 *      status = 200
 */
function accionEstado() {
    if (this.readyState == 4 && this.status == 200) {
        //Cuando ya se ha procesado la petición, el servidor ha devuelto los datos pedidos
        //y el resultado de la petición es OK (200), realizamos los cambios pertinentes
        let parrafo = document.getElementById("parrafo1");
        let respuesta = Array.from(JSON.parse(this.responseText));
        respuesta.forEach(element => {
            let elemento = document.createElement("p");
            elemento.innerHTML = element.name + "--> " + element.email;
            parrafo.appendChild(elemento);
        });
    }
}

function realizarPeticionPost() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = accionEstado2;
    request.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    //Añadir la cabecera que informará al servidor del formato en que van los datos enviados
    //    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //Enviar la petición con los datos necesarios
    //    request.send("userId=3&title=prueba1&body=Cuerpo de la prueba");

    //Para enviar los datos en formato JSon
    request.setRequestHeader("Content-Type", "application/json");
    let datosPeticion = JSON.stringify({ "userId": 3, "title": "prueba1", "body": "Cuerpo de la prueba" });
    request.send(datosPeticion);
}

function accionEstado2() {
    if (this.readyState == 4 && this.status == 201) {
        let parrafo = document.getElementById("parrafo2");
        let respuesta = JSON.parse(this.responseText);
        let elemento = document.createElement("p");
        elemento.innerHTML = respuesta.id + "--> " + respuesta.title;
        parrafo.appendChild(elemento);
    }
}