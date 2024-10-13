function $(id) {
    return document.getElementById(id);
}

$("search-button").addEventListener("click", searchMovies);

function searchMovies() {
    const query = document.getElementById("search-bar").value.trim();
    
    if (query) {
        fetchMovies(query);
    } else {
        alert("Por favor, ingrese un término de búsqueda");
    }
}

function fetchMovies(query) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=191528030c357419329af1198edbcb24&language=es-MX&query=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error("Error al obtener los resultados:", error);
        });
}

// function fetchMoviesAndSeries(query) {
//     const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=191528030c357419329af1198edbcb24&language=es-MX&query=${query}`;
//     const seriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=191528030c357419329af1198edbcb24&language=es-MX&query=${query}`;

//     // Realiza ambas búsquedas en paralelo usando Promise.all
//     Promise.all([
//         fetch(movieUrl).then(response => response.json()),
//         fetch(seriesUrl).then(response => response.json())
//     ])
//     .then(results => {
//         const [movieResults, seriesResults] = results;
//         const combinedResults = [...movieResults.results, ...seriesResults.results];
        
//         displayResults(combinedResults); // Muestra resultados combinados
//     })
//     .catch(error => {
//         console.error("Error al obtener los resultados:", error);
//     });
// }

function displayResults(movies) {
    const resultsContainer = $("results");

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.className = "movieSearch";

        const imgElement = document.createElement("img");
        imgElement.src = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'placeholder.jpg';
        imgElement.alt = movie.title;
        imgElement.className = "imgSearch";

        const titleElement = document.createElement("h3");
        titleElement.textContent = movie.title;
        titleElement.className = "titleSearch"

        const overviewElement = document.createElement("p");
        overviewElement.textContent = movie.overview;
        overviewElement.className = "pSearch";

        movieElement.appendChild(imgElement);
        movieElement.appendChild(titleElement);
        movieElement.appendChild(overviewElement);

        resultsContainer.appendChild(movieElement);
    });
}