function $(id) {
    return document.getElementById(id);
}

const BACKEND_URL = "https://backend-owlflix.vercel.app";

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    
    if (query) {
        fetchResults(query);
    }
});

/**
 * Llamado a la api y usar promesas para el manejo de la Api
 * @param {*} query 
 */
function fetchResults(query) {
    if (!query) {
        return;
    }

    // const seriePelicula = `http://localhost:3000/peliculas-series/${query}`;
    const seriePelicula = `${BACKEND_URL}/peliculas-series/${query}`;

    fetch(seriePelicula)
    .then(response => response.json())
    .then(data => {
        const movies = data.filter(item => item.CATEGORIA === "PELICULA");
        const series = data.filter(item => item.CATEGORIA === "SERIE");

        mostrarResultados(movies, series);
    })
    .catch(error => {
        console.error("Error al obtener los resultados:", error);
    });
}

/**
 * Crea los elementos necesarios para mostrar el resultado de la Api
 * @param {*} movies 
 * @param {*} series 
 * @returns 
 */
function mostrarResultados(movies, series) {
    const resultadosContainer = $("resultadosBusqueda");

    if (movies.length === 0 && series.length === 0) {
        const mensajeElement = document.createElement("h3");
        mensajeElement.textContent = "No se encontraron resultados";
        mensajeElement.className = "mensajeSinResultados";

        resultadosContainer.appendChild(mensajeElement);

        return;
    }

    movies.forEach(movie => {
        const divElement = document.createElement("div");
        divElement.className = "divSearch";

        const imgElement = document.createElement("img");
        imgElement.src = `https://image.tmdb.org/t/p/w500${movie.URL_IMAGEN}`;
        imgElement.alt = movie.TITULO_PS;
        imgElement.className = "imgSearch";

        const titleElement = document.createElement("h3");
        titleElement.textContent = movie.TITULO_PS;
        titleElement.className = "titleSearch";

        const aElement = document.createElement("a");
        aElement.setAttribute("href", `Paginas/detallesPeliculas.html?id=${movie.ID_PS}`);
        aElement.className = "aSearch";

        aElement.appendChild(imgElement);
        aElement.appendChild(titleElement);
        divElement.appendChild(aElement);

        resultadosContainer.appendChild(divElement);
    });

    series.forEach(serie => {
        const divElement = document.createElement("div");
        divElement.className = "divSearch";

        const imgElement = document.createElement("img");
        imgElement.src = `https://image.tmdb.org/t/p/w500${serie.URL_IMAGEN}`;
        imgElement.alt = serie.TITULO_PS;
        imgElement.className = "imgSearch";

        const nameElement = document.createElement("h3");
        nameElement.textContent = serie.TITULO_PS;
        nameElement.className = "titleSearch";

        const aElement = document.createElement("a");
        aElement.setAttribute("href", `Paginas/detallesSeries.html?id=${serie.ID_PS}`);
        aElement.className = "aSearch";

        aElement.appendChild(imgElement);
        aElement.appendChild(nameElement);
        divElement.appendChild(aElement);

        resultadosContainer.appendChild(divElement);
    });
}
