function $(id) {
    return document.getElementById(id);
}

let descuentoAplicado = false;

const BACKEND_URL = "https://backend-owlflix.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        const decoded = jwt_decode(token);
        const id = decoded.id;

        cargarCarrito(id);
    }
    else {
        console.error('Token no encontrado');
    }

    const aplicarDescuentoBtn = $("aplicarDescuento");
    if (aplicarDescuentoBtn) {
        aplicarDescuentoBtn.addEventListener("click", () => {
            const totalElement = $("total");
            const totalActual = parseFloat(totalElement.textContent.replace("Total: $", ""));

            const nuevoTotal = aplicarDescuento(totalActual);
            if (nuevoTotal !== null) {
                totalElement.textContent = `Total: $${nuevoTotal}`;

                sessionStorage.setItem("totalConDescuento", nuevoTotal);
            }
        });
    }

    const totalConDescuento = sessionStorage.getItem("totalConDescuento");
    if (totalConDescuento) {
        const totalElement = $("total");
        totalElement.textContent = `Total: $${totalConDescuento}`;
    }
});

async function cargarCarrito(usuarioId) {
    try {
        // const response = await fetch(`http://localhost:3000/carrito/${usuarioId}`)
        const response = await fetch(`${BACKEND_URL}/carrito/${usuarioId}`);
        const carrito = await response.json();

        sessionStorage.setItem("carrito", JSON.stringify(carrito));

        const carritoContainer = $("carritoContainer");
        carritoContainer.innerHTML = "";

        let total = 0;

        carrito.forEach(item => {
            const container = document.createElement("div");
            container.classList.add("carrito-item");

            const img = document.createElement("img");
            if (item.PS_ID === 2004 || item.PS_ID === 2005 || item.PS_ID === 2006) {
                img.setAttribute("src", `../Imagenes/Logo.png`);
                img.setAttribute("alt", item.TITULO_PS);
            } else {
                img.setAttribute("src", `https://image.tmdb.org/t/p/w500${item.URL_IMAGEN}`);
                img.setAttribute("alt", item.TITULO_PS);
            }

            const divInfo = document.createElement("div");
            divInfo.classList.add("carrito-item-info");
            divInfo.textContent = item.TITULO_PS;

            const divAccion = document.createElement("div");
            divAccion.classList.add("carrito-item-actions");

            const aEliminar = document.createElement("a");
            aEliminar.textContent = "Eliminar";
            aEliminar.setAttribute("href", "#");
            aEliminar.addEventListener("click", () => eliminarItem(usuarioId, item.PS_ID, item.CANTIDAD));

            const cantidad = document.createElement("span");
            cantidad.textContent = `${item.CANTIDAD}`;

            divAccion.appendChild(aEliminar);
            divAccion.appendChild(cantidad);

            const divPrecio = document.createElement("div");
            divPrecio.classList.add("carrito-item-price");
            divPrecio.textContent = `$${item.PRECIO}`;

            total += parseInt(item.PRECIO);

            container.appendChild(img);
            container.appendChild(divInfo);
            container.appendChild(divAccion);
            container.appendChild(divPrecio);

            carritoContainer.appendChild(container);
        });

        const totalElement = $("total-compra");
        totalElement.textContent = `Total: $${total}`;
    }
    catch (error) {
        console.error("Error al cargar el carrito:", error);
    }
}

async function eliminarItem(userId, idItem, cantidadActual) {
    try {
        if (cantidadActual === 1){
            // const response = await fetch(`http://localhost:3000/carrito/${userId}/${idItem}`, {
            const response = await fetch(`${BACKEND_URL}/carrito/${userId}/${idItem}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                cargarCarrito(userId);
            } else {
                const result = await response.json();
    
                console.error(result.error);
            }
        } else {
            // const response = await fetch(`http://localhost:3000/carrito/${userId}/${idItem}`, {
            const response = await fetch(`${BACKEND_URL}/carrito/${userId}/${idItem}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cantidad: cantidadActual - 1 })
            });

            if (response.ok) {
                cargarCarrito(userId);
            } else {
                const result = await response.json();
                console.error(result.error);
            }
        }
    }
    catch (error) {
        console.error("Error al eliminar producto", error);
    }
}

function aplicarDescuento(total) {
    if (total >= 2000) {
        if (descuentoAplicado) {
            alert("El descuento ya fue aplicado.");
            return null;
        }

        const codigo = prompt("Introduce el código de descuento:");
        if (codigo === "DONPOZO") {
            descuentoAplicado = true;

            const descuento = 299;
            const totalConDescuento = total - descuento;

            alert(`¡Descuento aplicado! Se descontaron $${descuento}.`);

            return totalConDescuento;
        } else {
            alert("Código incorrecto.");
        }
    } else {
        alert("El descuento solo se aplica para compras de $2000 o más.");
    }

    return null;
}
