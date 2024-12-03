function $(id) {
    return document.getElementById(id);
}

let descuentoAplicado = false;

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
        const response = await fetch(`http://localhost:3000/carrito/${usuarioId}`);
        const carrito = await response.json();

        sessionStorage.setItem("carrito", JSON.stringify(carrito));

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
            aEliminar.addEventListener("click", () => eliminarItem());
            
            const aComprarAhora = document.createElement("a");
            aComprarAhora.textContent = "Comprar Ahora";
            aComprarAhora.setAttribute("href", "#");
            aComprarAhora.addEventListener("click", () => comprarAhora());

            const cantidad = document.createElement("span");
            cantidad.textContent = `${item.cantidad}`;

            divAccion.appendChild(aEliminar);
            divAccion.appendChild(aComprarAhora);
            divAccion.appendChild(cantidad);

            const divPrecio = document.createElement("div");
            divPrecio.classList.add("carrito-item-price");
            divPrecio.textContent = `$${item.precio}`;

            total += parseInt(item.precio);

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

function comprarAhora(element) {
    // const item = element.closest(".carrito-item");
    // const name = item.getAttribute("data-name");
    // const price = item.getAttribute("data-price");

    // const confirmar = confirm(`¿Deseas continuar con la compra de: ${name} por $${price}?`);

    // if (confirmar) {
    //     window.location.href = `confirmacion.html?producto=${encodeURIComponent(name)}&precio=${price}`;
    // } else {
    //     alert("Compra cancelada. Sigues en el carrito.");
    // }

    alert("Comprar Ahora");
}

function eliminarItem() {
    alert("Eliminar");
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

async function eliminarDelCarrito(itemId) {
    try {
        const response = await fetch(`http://localhost:3000/carrito/${itemId}`, { method: "DELETE" });
        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            cargarCarrito(idUsuario);
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
    }
}

async function idUsuario() {
    const token = localStorage.getItem("auth_token");

    if (token) {
        try {
            const decoded = jwtDecode(token);
        
            const userId = decoded.id;

            return userId;
        }
        catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    }
    else {
        console.log('No hay token disponible');
    }
}
