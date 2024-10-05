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
        }
    });
}

function botonSiguiente() {
    const btnSiguiente = $("btnSiguiente");

    btnSiguiente.addEventListener("click", () => {
        if (pagina < 1000) {
            pagina += 1;
            cargarPeliculas();
        }
    });
}

function crearCarta(titulo, imgUrl, id) {
    const card = document.createElement("div");
    card.className = "poster";

    const link = document.createElement("a");
    link.setAttribute("href", `detallesPeliculas.html?id=${id}`);

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

const cargarPeliculas = async () => {
    const container = $("peliculasContainer");
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
        const data = await respuesta.json();

        for (const pelicula of data.results) {
            const poster = crearCarta(pelicula.title, `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`, pelicula.id);
            // console.log(pelicula.id);

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
};
