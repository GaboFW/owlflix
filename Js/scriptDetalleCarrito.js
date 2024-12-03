function $(id) {
    return document.getElementById(id);
}

const productosDiv = $("productos");
const totalDiv = $("total-compra");

const carritoJSON = sessionStorage.getItem("carrito");
const totalConDescuento = sessionStorage.getItem("totalConDescuento");

let userId = idUsuario();

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

const formPago = $("form-pago");
formPago.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Compra realizada con éxito. Gracias por tu compra.");

    sessionStorage.clear();

    eliminarDelCarrito(userId);
});

$("tarjeta").addEventListener("input", function (e) {
    const input = e.target;
    let value = input.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const blocks = [];

    for (let i = 0; i < value.length; i += 4) {
        blocks.push(value.substring(i, i + 4));
    }

    input.value = blocks.join(" ").substring(0, 19);
});

$("vencimiento").addEventListener("input", function (e) {
    const input = e.target;
    let value = input.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
        input.value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
});

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
    sessionStorage.clear();

    eliminarDelCarrito(userId);

    window.location.href = "carrito.html"; 
});

async function eliminarDelCarrito(id) {
    try {
        const response = await fetch(`http://localhost:3000/carrito/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (response.ok) {
            cargarCarrito(idUsuario());
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
    }
}

function idUsuario() {
    const token = localStorage.getItem("auth_token");

    if (token) {
        const decoded = jwt_decode(token);
    
        const userId = decoded.id;

        return userId;
    } else {
        console.log('No hay token disponible');
    }
}
