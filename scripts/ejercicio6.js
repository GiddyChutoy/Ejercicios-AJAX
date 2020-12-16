window.addEventListener("load", () => {
    document.getElementById("form").addEventListener("submit", manejarEventoSubmit, false);
}, false);

function manejarEventoSubmit(event) {
    event.preventDefault();

    let datosCliente = getDatosCliente();

    nuevoCliente(datosCliente)
        .then((datosClienteNuevo) => {
            rellenarTabla(datosClienteNuevo);
        })
        .catch((error) => {
            alert(error);
        });
}

function nuevoCliente(datosCliente) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/clientes", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(datosCliente));

        request.addEventListener("load", () => {
            if (request.status === 201) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject("Se ha producido un error al almacenar los datos");
            }
        });
        request.addEventListener('error', () => reject('Error en la petición HTTP'));
    });
}

function getDatosCliente() {

    let prefs = "";
    let checks = Array.from(document.querySelectorAll("input[type=checkbox]:checked"));
    checks.forEach(check => {
        if (prefs == "") {
            prefs = prefs + check.value;
        } else {
            prefs = prefs + "_" + check.value;
        }
    });

    let datosCliente = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        DNI: document.getElementById("dni").value,
        fechaNac: document.getElementById("fechaNac").value,
        Sexo: document.getElementById("form").sexo.value,
        preferencias: prefs
    };

    return datosCliente;
}

function rellenarTabla(datosClienteNuevo) {
    let tabla = document.getElementById("tabla");
    let nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `<td>${datosClienteNuevo.id} </td> 
            <td>${datosClienteNuevo.nombre}  ${datosClienteNuevo.apellidos}</td>
            <td>${datosClienteNuevo.fechaNac} </td>
            <td>${datosClienteNuevo.Sexo} </td>`;
    tabla.appendChild(nuevaFila);
}