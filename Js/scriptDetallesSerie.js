function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const idSerie = params.get("id");

    if (idSerie) {
        try {
            const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${idSerie}?api_key=191528030c357419329af1198edbcb24&language=es-MX`);
            const data = await respuesta.json();

            $("tituloSerie").textContent = data.name;
            $("posterSerie").setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);
            $("posterSerie").setAttribute("alt", data.name);
            $("descripcionSerie").textContent = data.overview;
            $("temporadas").textContent = data.seasons[0].season_number;
            data.genres.forEach(genre => {
                const generoElemento = document.createElement("span");
                generoElemento.textContent = genre.name + " ";
                $("generos").appendChild(generoElemento);
            });
        } catch (error) {
            console.error("Error al cargar los detalles de la película: ", error);
        }
    }
});
