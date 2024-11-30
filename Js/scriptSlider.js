function $(id) {
    return document.getElementById(id);
}

const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    breakpoints: {
        350: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 2,
        },
        1000: {
            slidesPerView: 3,
        },
        1500: {
            slidesPerView: 4,
        },
    },
});

/**
 * Crea los elementos para el swiper
 * @param {*} titulo 
 * @param {*} imgUrl 
 * @param {*} id 
 * @param {*} categoria 
 * @returns 
 */
function crearCarta(titulo, imgUrl, id, categoria) {
    const card = document.createElement("div");
    card.className = "swiper-slide";

    const link = document.createElement("a");
    link.setAttribute("href", `Paginas/detalles${categoria}.html?id=${id}`);

    const img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    img.setAttribute("alt", titulo);

    link.appendChild(img);
    card.appendChild(link);

    return card;
}

/**
 * Llamado a la Api para traer las peliculas
 */
async function cargarPeliculas() {
    const container = $("sliderPelis");

    try {
        // const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d58fdc66ad2a2f7d5380209c2a7881cc&language=es-MX&page=1`);
        const respuesta = await fetch(`http://localhost:3000/peliculas?page=1`);
        const data = await respuesta.json();

        const ochoPeliculas = data.slice(0, 8);
        for (const pelicula of ochoPeliculas) {
            // const poster = crearCarta(pelicula.title, `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`, pelicula.id, "Peliculas");
            const poster = crearCarta(pelicula.TITULO_PS, `https://image.tmdb.org/t/p/w500${pelicula.URL_IMAGEN}`, pelicula.ID_PS, "Peliculas");

            container.appendChild(poster);
        }

    } catch (error) {
        console.error("Error ", error.message);
    }
};

/**
 * Llamado a la Api para traer las series
 */
async function cargarSeries() {
    const container = $("sliderSeries");

    try {
        // const respuesta = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=d58fdc66ad2a2f7d5380209c2a7881cc&language=es-MX&page=1`);
        const respuesta = await fetch(`http://localhost:3000/series?page=1`);
        const data = await respuesta.json();

        const ochoSeries = data.slice(0, 8);
        for (const serie of ochoSeries) {
            // const poster = crearCarta(serie.title, `https://image.tmdb.org/t/p/w500${serie.poster_path}`, serie.id, "Series");
            const poster = crearCarta(serie.TITULO_PS, `https://image.tmdb.org/t/p/w500${serie.URL_IMAGEN}`, serie.ID_PS, "Series");

            container.appendChild(poster);
        }

    } catch (error) {
        console.error("Error ", error.message);
    }
};

window.onload = () => {
    cargarPeliculas();
    cargarSeries();
};