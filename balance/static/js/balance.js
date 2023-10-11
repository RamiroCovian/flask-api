const peticion = new XMLHttpRequest();


// alert("Hola desde JavaScript");
function cargarMovimientos() {
    console.log("Has llamado a la funcion de cargar movimientos");
    peticion.open("GET", "http://localhost:5000/api/v1/movimientos", true);
    peticion.send();
    console.log("FIN carga movimientos")
}

function borrarMovimiento(evento) {
    const target = evento.target;
    const id = target.getAttribute('data-id');
    const xhr = new XMLHttpRequest()
    xhr.open('DELETE', `http://localhost:5000/api/v1/movimientos/${id}`, false);
    xhr.send();
    cargarMovimientos();
}

function mostrarMovimientos() {
    console.log("Entramos en mostrar movimientos")
    const resultado = JSON.parse(peticion.responseText);
    const movimientos = resultado.results;


    let html = "";
    // En Python:
    // for i in Range(len(movimientos)):
    //     i = i + 1
    for (let i = 0; i < movimientos.length; i = i + 1) {
        const mov = movimientos[i];

        const fecha = new Date(mov.fecha);
        const fechaFormateada = fecha.toLocaleDateString();

        if (mov.tipo === "G") {
            mov.tipo = "Gasto"
        } else if (mov.tipo === "I") {
            mov.tipo = "Ingreso";
        } else {
            mov.tipo = "---";
        }

        const opciones = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
        const formateador = new Intl.NumberFormat("es-ES", opciones);
        const cantidad = formateador.format(mov.cantidad);

        html = html + `
            <tr>
                <td>${fechaFormateada}</td> 
                <td>${mov.concepto}</td>
                <td>${mov.tipo}</td>
                <td class="numero">${cantidad}</td>
                <td class="acciones">
                    <a class="mini-boton delete">
                        <i data-id="${mov.id}" class="fa-solid fa-eraser"></i>
                    </a>
                </td>
            </tr>
        `;
    }
    const tabla = document.querySelector("#cuerpo-tabla");
    tabla.innerHTML = html;
    
    const botonesBorrar = document.querySelectorAll('.mini-boton.delete');
    // botonesBorrar.forEach(function (btn) { console.log(btn); })
    botonesBorrar.forEach((btn) => btn.addEventListener('click', borrarMovimiento));

    console.log('FIN de la función mostrar movimientos');
}

window.onload = function () {
    console.log("Ya se han cargado los elementos de la pag (window.onload)" );
    // const boton = document.querySelector("#boton-recarga");
    const boton = document.getElementById("boton-recarga");
    boton.addEventListener("click", cargarMovimientos);

    cargarMovimientos();

    peticion.onload = mostrarMovimientos;

    console.log("FIN de la funcion window.onload");
}
