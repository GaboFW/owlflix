function $(id) {
    return document.getElementById(id);
}

let pagina = 1;

function botonAnterior() {
    const btnAnterior = $("btnAnterior");

    btnAnterior.addEventListener("click", () => {
        if (pagina > 1) {
            pagina -= 1;
            cargarPeliculas();
            cargarSeries();
        }
    });
}

function botonSiguiente() {
    const btnSiguiente = $("btnSiguiente");

    btnSiguiente.addEventListener("click", () => {
        if (pagina < 1000) {
            pagina += 1;
            cargarPeliculas();
            cargarSeries();
        }
    });
}

/**
 * Crea los elementos para crear el card con las peliculas o series
 * @param {*} titulo 
 * @param {*} imgUrl 
 * @param {*} id 
 * @param {*} categoria 
 * @returns 
 */
function crearCarta(titulo, imgUrl, id, categoria) {
    const card = document.createElement("div");
    card.className = "poster";

    const link = document.createElement("a");
    link.setAttribute("href", `detalles${categoria}.html?id=${id}`);

    const img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    img.setAttribute("alt", titulo);

    const title = document.createElement("div");
    title.className = "titulo";
    title.textContent = titulo;

    link.appendChild(img);
    link.appendChild(title);
    card.appendChild(link);

    return card;
}

/**
 * Llamado a la Api para traer las peliculas
 * @returns 
 */
async function cargarPeliculas() {
    const container = $("peliculasContainer");

    if (!container) { return }
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
        const data = await respuesta.json();

        for (const pelicula of data.results) {
            const poster = crearCarta(pelicula.title, `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`, pelicula.id, "Peliculas");

            container.appendChild(poster);
        }
    } catch (error) {
        console.error("Error ", error.message);
    }
};

/**
 * Llamado a la Api para traer las series
 * @returns 
 */
async function cargarSeries() {
    const container = $("seriesContainer");

    if (!container) { return }
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
        const data = await respuesta.json();

        for (const serie of data.results) {
            const poster = crearCarta(serie.name, `https://image.tmdb.org/t/p/w500${serie.poster_path}`, serie.id, "Series");
            
            container.appendChild(poster);
        }
    } catch (error) {
        console.error("Error ", error.message);
    }
};

window.onload = () => {
    botonAnterior();
    botonSiguiente();
    cargarPeliculas();
    cargarSeries();
};
