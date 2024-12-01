function $(id) {
    return document.getElementById(id);
}

let descuentoAplicado = false;

function calcularTotal() {
    const items = document.querySelectorAll(".carrito-item");
    let total = 0;

    items.forEach(item => {
        const price = parseInt(item.getAttribute("data-price"));
        total += price;
    });

    // Aplicar descuento si ya se aplicó
    if (descuentoAplicado) {
        total -= 299;
    }

    return total;
}

function actualizarTotal() {
    let total = calcularTotal();
    if (total < 0) total = 0;
    document.getElementById("total").textContent = `Total: $${total}`;
}

function aplicarDescuento() {
    let total = calcularTotal() + 299; // Añadimos 299 para verificar el total sin descuento
    if (total >= 2000) {
        if (descuentoAplicado) {
            alert("El descuento ya fue aplicado.");
            return;
        }
        const codigo = prompt("Introduce el código de descuento:");
        if (codigo === "DONPOZO") {
            descuentoAplicado = true;
            actualizarTotal();
            alert("¡Descuento aplicado!");
        } else {
            alert("Código incorrecto.");
        }
    } else {
        alert("El descuento solo se aplica para compras de $2000 o más.");
    }
}

function eliminarItem(element) {
    const item = element.closest(".carrito-item");
    item.remove();
    actualizarTotal();
}

function comprarAhora(element) {
    const item = element.closest(".carrito-item");
    const name = item.getElementsByClassName("tituloCarrito")[0].textContent;
    const price = item.getElementsByClassName("carrito-item-price")[0].textContent;

    const confirmar = confirm(`¿Deseas continuar con la compra de: ${name} por $${price}?`);

    if (confirmar) {
        window.location.href = `confirmacion.html?producto=${encodeURIComponent(name)}&precio=${price}`;
    } else {
        alert("Compra cancelada. Sigues en el carrito.");
    }
}

function continuarCompra() {
    const items = document.querySelectorAll(".carrito-item");
    if (items.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Recopilar datos de los productos
    const productos = [];
    items.forEach(item => {
        const name = item.getElementsByClassName("tituloCarrito")[0].textContent;
        const price = item.getElementsByClassName("carrito-item-price")[0].textContent;
        productos.push({ name, price });
    });

    // Obtener el total y si se aplicó descuento
    const total = calcularTotal();
    const descuento = descuentoAplicado;

    // Almacenar datos en sessionStorage
    sessionStorage.setItem('productos', JSON.stringify(productos));
    sessionStorage.setItem('total', total);
    sessionStorage.setItem('descuento', descuento);

    // Redirigir a la página de confirmación
    window.location.href = 'confirmacion.html';
}

actualizarTotal();

// function generarCarrito(urlImagen, titulo) {
//     const container = document.createElement("div");
//     container.classList.add("carrito-item");

//     let img = document.createElement("img");
//     img.setAttribute("src", urlImagen);
//     img.setAttribute("alt", titulo);

//     let divInfo = document.createElement("div");
//     divInfo.classList.add("carrito-item-info");

//     let p = document.createElement("p");
//     p.textContent = titulo;
//     divInfo.appendChild(p);

//     let divAccion = document.createElement("div");
//     divAccion.classList.add("carrito-item-actions");

//     let aEliminar = document.createElement("a");
//     aEliminar.textContent = "Eliminar";
//     aEliminar.onclick = () => eliminarItem(container);

//     let aComprar = document.createElement("a");
//     aComprar.textContent = "Comprar Ahora";
//     aComprar.onclick = () => comprarItem(container);

//     divAccion.appendChild(aEliminar);
//     divAccion.appendChild(aComprar);

//     let divPrecio = document.createElement("div");
//     divPrecio.classList.add("carrito-item-price");
//     divPrecio.textContent = "$1000";

//     container.appendChild(img);
//     container.appendChild(divInfo);
//     container.appendChild(divAccion);
//     container.appendChild(divPrecio);

//     const carritoContainer = $("carrito-container");
//     carritoContainer.appendChild(container);

//     return container;
// }


