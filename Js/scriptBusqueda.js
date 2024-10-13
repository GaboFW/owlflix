function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    
    if (query) {
        fetchMovies(query);
        fetchSeries(query);
    }
});

function fetchMovies(query) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=191528030c357419329af1198edbcb24&language=es-MX&query=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            resultadoPeliculas(data.results);
        })
        .catch(error => {
            console.error("Error al obtener los resultados:", error);
        });
}

function fetchSeries(query) {
    const apiUrl = `https://api.themoviedb.org/3/search/tv?api_key=191528030c357419329af1198edbcb24&language=es-MX&query=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            resultadoSeries(data.results);
        })
        .catch(error => {
            console.error("Error al obtener los resultados:", error);
        });
}

function resultadoPeliculas(movies) {
    const resultadosContainer = $("resultadosBusqueda");

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
}

function resultadoSeries(series) {
    const resultadosContainer = $("resultadosBusqueda");

    series.forEach(serie => {
        const divElement = document.createElement("div");
        divElement.className = "divSearch";

        const imgElement = document.createElement("img");
        imgElement.src = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
        imgElement.alt = serie.title;
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
