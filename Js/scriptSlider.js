function $(id) {
    return document.getElementById(id);
}

function crearCarta(titulo, imgUrl, id, categoria) {
    const col = document.createElement("div");
    col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

    const card = document.createElement("div");
    card.className = "card";

    const link = document.createElement("a");
    link.setAttribute("href", `Paginas/detalles${categoria}.html?id=${id}`);

    const img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    img.setAttribute("alt", titulo);
    img.className = "card-img-top rounded img-fluid imgModificar";

    link.appendChild(img);
    card.appendChild(link);
    col.appendChild(card);

    return col;
}

async function cargarPeliculas() {
    const container = $("sliderPelis");
    const container2 = $("sliderPelis2");

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=1`);
        const data = await respuesta.json();

        const cincoPeliculas1 = data.results.slice(0, 5);
        for (const pelicula of cincoPeliculas1) {
            const poster = crearCarta(pelicula.title, `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`, pelicula.id, "Peliculas");

            container.appendChild(poster);
        }

        const cincoPeliculas2 = data.results.slice(10, 15);
        for (const pelicula of cincoPeliculas2) {
            const poster = crearCarta(pelicula.title, `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`, pelicula.id, "Peliculas");

            container2.appendChild(poster);
        }

    } catch (error) {
        console.error("Error ", error.message);
    }
};

async function cargarSeries() {
    const container = $("sliderSeries");
    const container2 = $("sliderSeries2");

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=1`);
        const data = await respuesta.json();

        const cincoSeries1 = data.results.slice(0, 5);
        for (const serie of cincoSeries1) {
            const poster = crearCarta(serie.title, `https://image.tmdb.org/t/p/w500${serie.poster_path}`, serie.id, "Series");

            container.appendChild(poster);
        }

        const cincoSeries2 = data.results.slice(10, 15);
        for (const serie of cincoSeries2) {
            const poster = crearCarta(serie.title, `https://image.tmdb.org/t/p/w500${serie.poster_path}`, serie.id, "Series");

            container2.appendChild(poster);
        }

    } catch (error) {
        console.error("Error ", error.message);
    }
};

window.onload = () => {
    cargarPeliculas();
    cargarSeries();
};