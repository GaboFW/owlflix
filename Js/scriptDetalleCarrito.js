function $(id) {
    return document.getElementById(id);
}

const productosDiv = $("productos");
const totalDiv = $("total-compra");

const carritoJSON = sessionStorage.getItem("carrito");
console.log(carritoJSON);
const totalConDescuento = sessionStorage.getItem("totalConDescuento");

let total = 0;

if (carritoJSON) {
    const carrito = JSON.parse(carritoJSON);

    carrito.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.titulo_ps} (${item.cantidad}) - $${item.precio}`;
        productosDiv.appendChild(p);

        total += parseInt(item.precio);
    });

    if (totalConDescuento) {
        const descuento = total - parseFloat(totalConDescuento);

        totalDiv.innerHTML = `
            <p>Subtotal: $${total}</p>
            <p>Descuento (DONPOZO): $${descuento}</p>
            <p class="total">Total: $${totalConDescuento}</p>
        `;
    } else {
        totalDiv.innerHTML = `
            <p class="total">Total: $${total}</p>
        `;
    }
}

// const descuentoAplicado = sessionStorage.getItem("descuento") === "true"; // Determinar si hay descuento aplicado

// Manejo del formulario
const formPago = $("form-pago");
formPago.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Compra realizada con éxito. Gracias por tu compra.");
    // Aquí se podría redirigir o limpiar el sessionStorage si es necesario
    sessionStorage.clear();

    // Llamar al delete del carrito
});

// Validación en tiempo real
$("tarjeta").addEventListener("input", function (e) {
    const input = e.target;
    let value = input.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const blocks = [];

    for (let i = 0; i < value.length; i += 4) {
        blocks.push(value.substring(i, i + 4));
    }

    input.value = blocks.join(" ").substring(0, 19); // Limitar a 19 caracteres (16 dígitos + 3 espacios)

    // Mostrar tipo de tarjeta
    const tarjetaIcono = $("icono-tarjeta");
    if (/^4/.test(value)) {
        tarjetaIcono.textContent = "Visa";
    } else if (/^5[1-5]/.test(value)) {
        tarjetaIcono.textContent = "MasterCard";
    } else {
        tarjetaIcono.textContent = ""; // Sin ícono
    }
});

$("vencimiento").addEventListener("input", function (e) {
    const input = e.target;
    let value = input.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
        input.value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
});

// Validar al enviar
$("form-pago").addEventListener("submit", function (e) {
    e.preventDefault();

    const tarjeta = $("tarjeta").value.replace(/\s+/g, "");
    const vencimiento = $("vencimiento").value;
    const cvv = $("cvv").value;

    if (tarjeta.length !== 16 || !/^\d+$/.test(tarjeta)) {
        alert("Número de tarjeta inválido.");
        return;
    }

    const [mes, anio] = vencimiento.split("/");
    if (!mes || !anio || mes < 1 || mes > 12 || anio < new Date().getFullYear() % 100) {
        alert("Fecha de vencimiento inválida.");
        return;
    }

    if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
        alert("CVV inválido.");
        return;
    }

    alert("Pago realizado con éxito. ¡Gracias por tu compra!");
    sessionStorage.clear(); // Limpiar datos del carrito

    // Llamar el delete para la db
});