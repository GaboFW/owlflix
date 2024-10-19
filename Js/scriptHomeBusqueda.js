function $(id) {
    return document.getElementById(id);
}

$("search-button").addEventListener("click", cambiarHref());

$("search-bar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        cambiarHref();
    }
});

// function cambiarHref() {
//     const query = $("search-bar").value.trim();

//     const repo = "OwlFlix";

//     if (query) {
//         window.location.href = `${window.location.origin}/${repo}/busqueda.html?search=${query}`;
//     }
// }

function cambiarHref() {
    const query = $("search-bar").value.trim();
    const repo = "OwlFlix";

    if (query) {
        window.location.href = `/${repo}/busqueda.html?search=${query}`;
    }
}

console.log(window.location);