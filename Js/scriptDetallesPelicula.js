function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const idPelicula = params.get("id");

    if (idPelicula) {
        try {
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${idPelicula}?api_key=191528030c357419329af1198edbcb24&language=es-MX`);
            const data = await respuesta.json();

            $("tituloPelicula").textContent = data.title;
            $("posterPelicula").setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);
            $("posterPelicula").setAttribute("alt", data.title);
            $("descripcionPelicula").textContent = data.overview;
            $("fechaLanzamiento").textContent = `Fecha de lanzamiento: ${data.release_date}`;
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
