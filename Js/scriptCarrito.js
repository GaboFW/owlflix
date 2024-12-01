function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
    idUsuario();
});

async function agregarAlCarrito(peliculaId) {
    const usuarioId = 1; // AHORA VEO QUE ONDA

    try {
        const response = await fetch("http://localhost:3000/carrito", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuarioId, psId: peliculaId })
        });

        const result = await response.json();
        if (response.ok) {
            cargarCarrito(usuarioId);
        }
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("Error al agregar al carrito.");
    }
}

async function cargarCarrito(usuarioId) {
    try {
        const response = await fetch(`http://localhost:3000/carrito/${usuarioId}`);
        const carrito = await response.json();

        const carritoContainer = $("carritoContainer");
        carritoContainer.innerHTML = "";

        let total = 0;

        carrito.forEach(item => {
            const container = document.createElement("div");
            container.classList.add("carrito-item");

            const img = document.createElement("img");
            img.setAttribute("src", `https://image.tmdb.org/t/p/w500${item.url_imagen}`);
            img.setAttribute("alt", item.titulo_ps);

            const divInfo = document.createElement("div");
            divInfo.classList.add("carrito-item-info");
            divInfo.textContent = item.titulo_ps;

            const divAccion = document.createElement("div");
            divAccion.classList.add("carrito-item-actions");

            const aEliminar = document.createElement("a");
            aEliminar.textContent = "Eliminar";
            aEliminar.setAttribute("href", "#");
                      //AGREGAR ONCLICK
            const aComprarAhora = document.createElement("a");
            aComprarAhora.textContent = "Comprar Ahora";
            aComprarAhora.setAttribute("href", "#");

            divAccion.appendChild(aEliminar);
            divAccion.appendChild(aComprarAhora);

            const divPrecio = document.createElement("div");
            divPrecio.classList.add("carrito-item-price");
            divPrecio.textContent = `$${item.precio}`;

            total += item.precio;

            container.appendChild(img);
            container.appendChild(divInfo);
            container.appendChild(divAccion);
            container.appendChild(divPrecio);

            carritoContainer.appendChild(container);
        });

        const totalElement = $("total");
        totalElement.textContent = `Total: $${total}`;
    }
    catch (error) {
        console.error("Error al cargar el carrito:", error);
    }
}

// async function eliminarDelCarrito(itemId) {
//     try {
//         const response = await fetch(`http://localhost:3000/carrito/${itemId}`, { method: "DELETE" });
//         const result = await response.json();

//         if (response.ok) {
//             alert(result.message);
//             cargarCarrito(1); // Recargar el carrito
//         } else {
//             alert(result.error);
//         }
//     } catch (error) {
//         console.error("Error al eliminar del carrito:", error);
//     }
// }

async function idUsuario() {
    try {
        const response = await fetch(`http://localhost:3000/carrito/user/`);
        const result = await response.json();

        console.log(result);

        for (const id of result) {
            cargarCarrito(id.usuario_id);
        }
    }
    catch (error) {
        console.error("Error al eliminar del carrito:", error);
    }
}

