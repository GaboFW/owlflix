function $(id) {
    return document.getElementById(id);
}

const urlParams = new URLSearchParams(window.location.search);
let pagina = parseInt(urlParams.get("page")) || 1;

function botonAnterior() {
    const btnAnterior = document.getElementById("btnAnterior");

    btnAnterior.addEventListener("click", () => {
        if (pagina > 1) {
            pagina -= 1;
            window.location.search = `?page=${pagina}`;
        }
    });
}

function botonSiguiente() {
    const btnSiguiente = document.getElementById("btnSiguiente");

    btnSiguiente.addEventListener("click", () => {
        pagina += 1;
        window.location.search = `?page=${pagina}`;
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
        const respuesta = await fetch(`http://localhost:3000/peliculas?page=${pagina}`);
        const data = await respuesta.json();

        for (const pelicula of data) {
            const poster = crearCarta(pelicula.TITULO_PS, `https://image.tmdb.org/t/p/w500${pelicula.URL_IMAGEN}`, pelicula.ID_PS, "Peliculas");
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
        const respuesta = await fetch(`http://localhost:3000/series?page=${pagina}`);
        const data = await respuesta.json();

        for (const serie of data) {
            const poster = crearCarta(serie.TITULO_PS, `https://image.tmdb.org/t/p/w500${serie.URL_IMAGEN}`, serie.ID_PS, "Series");
            
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
