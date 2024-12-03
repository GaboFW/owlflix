function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const idPelicula = params.get("id");

    $("btnCarrito").addEventListener("submit", agregarAlCarrito(idPelicula, idUsuario()));

    if (idPelicula) {
        try {
            const respuesta = await fetch(`http://localhost:3000/peliculas/${idPelicula}`);
            const datos = await respuesta.json();
            const data = datos[0];

            $("tituloPelicula").textContent = data.TITULO_PS;
            $("posterPelicula").setAttribute("src", `https://image.tmdb.org/t/p/w500${data.URL_IMAGEN}`);
            $("posterPelicula").setAttribute("alt", data.TITULO_PS);
            $("descripcionPelicula").textContent = data.SINOPSIS;
            $("fechaLanzamiento").textContent = `Fecha de lanzamiento: ${data.FECHA_LANZAMIENTO}`;
            generos(idPelicula);

        } catch (error) {
            console.error("Error al cargar los detalles de la película: ", error);
        }
    }
});

function generos(id) {
    fetch(`http://localhost:3000/genero/${id}`)
    .then(response => response.json())
    .then(data => {
        for (const genero of data) {
            const nombreGenero = document.createElement("span");
            nombreGenero.textContent = genero.nombre + " ";
            $("generos").appendChild(nombreGenero);
        }
    })
    .catch(error => {
        console.log("Error:", error.message);
    });
};

function idUsuario() {
    const token = localStorage.getItem("auth_token");
    if (token) {
        const decoded = jwt_decode(token);
        const id = decoded.id;

        return id;
    }
    else {
        console.error('Token no encontrado');
    }
}

async function agregarAlCarrito(peliculaId, usuarioId) {
    try {
        const response = await fetch("http://localhost:3000/carrito", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuarioId, psId: peliculaId })
        });

        const result = await response.json();

    } catch (error) {
        console.error("Error al agregar al carrito:", error);
    }
}
