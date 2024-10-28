function $(id) {
    return document.getElementById(id);
}

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
    const moviesApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=191528030c357419329af1198edbcb24&language=es-MX&query=${query}`;
    const seriesApiUrl = `https://api.themoviedb.org/3/search/tv?api_key=191528030c357419329af1198edbcb24&language=es-MX&query=${query}`;

    Promise.all([
        fetch(moviesApiUrl)
        .then(response => response.json())
        .then(data => data.results),

        fetch(seriesApiUrl)
        .then(response => response.json())
        .then(data => data.results)
    ])
    .then(([movies, series]) => {
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
    const resultadosContainer = document.getElementById("resultadosBusqueda");

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
        imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        imgElement.alt = movie.title;
        imgElement.className = "imgSearch";

        const titleElement = document.createElement("h3");
        titleElement.textContent = movie.title;
        titleElement.className = "titleSearch";

        const aElement = document.createElement("a");
        aElement.setAttribute("href", `Paginas/detallesPeliculas.html?id=${movie.id}`);
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
        imgElement.src = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
        imgElement.alt = serie.name;
        imgElement.className = "imgSearch";

        const nameElement = document.createElement("h3");
        nameElement.textContent = serie.name;
        nameElement.className = "titleSearch";

        const aElement = document.createElement("a");
        aElement.setAttribute("href", `Paginas/detallesSeries.html?id=${serie.id}`);
        aElement.className = "aSearch";

        aElement.appendChild(imgElement);
        aElement.appendChild(nameElement);
        divElement.appendChild(aElement);

        resultadosContainer.appendChild(divElement);
    });
}
