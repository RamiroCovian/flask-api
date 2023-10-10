const peticion = new XMLHttpRequest();


// alert("Hola desde JavaScript");
function cargarMovimientos() {
    console.log("Has llamado a la funcion de cargar movimientos");
    peticion.open("GET", "http://localhost:5000/api/v1/movimientos", false);
    peticion.send();
    console.log(peticion.responseText);
}

window.onload = function () {
    console.log("Ya se han cargado los elementos de la pag");
    // const boton = document.querySelector("#boton-recarga");
    const boton = document.getElementById("boton-recarga");
    boton.addEventListener("click", cargarMovimientos);
    console.log("FIN de la funcion window.onload");
}
