function $(id) {
    return document.getElementById(id);
}

$("search-button").addEventListener("click", cambiarHref);

$("search-bar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        cambiarHref();
    }
});

/**
 * Cambia el html para ir a la busqueda
 */
function cambiarHref() {
    const query = $("search-bar").value.trim();
    const repo = "owlflix";

    if (query) {
        const basePath = window.location.pathname.includes(repo) ? `/${repo}` : "";
        window.location.href = `${basePath}/busqueda.html?search=${query}`;
    }
}
