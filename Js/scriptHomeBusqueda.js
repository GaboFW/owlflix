function $(id) {
    return document.getElementById(id);
}

$("search-button").addEventListener("click", function () {
    cambiarHref();
});

$("search-bar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        cambiarHref();
    }
});

function cambiarHref() {
    const query = $("search-bar").value.trim();
    if (query) {
        window.location.href = `../busqueda.html?search=${query}`;
    }
}

