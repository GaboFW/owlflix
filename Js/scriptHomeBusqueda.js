function $(id) {
    return document.getElementById(id);
}

$("search-button").addEventListener("click", cambiarHref());

$("search-bar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        cambiarHref();
    }
});

function cambiarHref() {
    const query = $("search-bar").value.trim();
    if (query) {
        window.location.href = `D:/Escritorio/UTN/Programacion III/CuevanaChino/busqueda.html?search=${query}`; /////////////////////////////////////////////
    }
}
