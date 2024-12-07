function $(id) {
    return document.getElementById(id);
}

const productosDiv = $("productos");
const totalDiv = $("total-compra");

const carritoJSON = sessionStorage.getItem("carrito");
const totalConDescuento = sessionStorage.getItem("totalConDescuento");

const miembrosNombre = sessionStorage.getItem("miembroNombre");
const miembrosPrecio = sessionStorage.getItem("miembroPrecio");

const carrito = JSON.parse(carritoJSON);

let userId = idUsuario();

let total = 0;

if (miembrosNombre && miembrosPrecio) {
    const planPrecio = parseFloat(miembrosPrecio);
    const p = document.createElement("p");
    p.textContent = `Plan: ${miembrosNombre} - $${planPrecio}`;
    productosDiv.appendChild(p);

    total += planPrecio;
}

if (carritoJSON) {
    carrito.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.titulo_ps} (${item.cantidad}) - $${item.precio}`;
        productosDiv.appendChild(p);

        total += parseFloat(item.precio);
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

$("cvv").addEventListener("input", function (e) {
    const input = e.target;
    let value = input.value.replace(/[^0-9]/g, "");
    input.value = value.substring(0, 3);
});

$("form-pago").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreCliente = $("nombre").value;
    comprobante(userId, nombreCliente);

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

    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        alert("CVV inválido.");
        return;
    }

    sessionStorage.clear();

    eliminarDelCarrito(userId);

    Swal.fire({
        icon: "success",
        title: "Pago exitoso",
        text: "Tu compra se realizó correctamente.",
        showConfirmButton: false,
        timer: 2000
    })
    .then(() => {
        window.location.href = "carrito.html";
    });
});

async function eliminarDelCarrito(id) {
    try {
        const response = await fetch(`http://localhost:3000/carrito/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (response.ok) {
            cargarCarrito(userId);
        } else {
            console.error(result.error);
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
        console.log("No hay token disponible");
    }
}

async function comprobante(userId, nombreCliente) {

    if (!carrito || !userId) {
        alert("Error: No se pudo completar la compra.");
        return;
    }

    const descuento = totalConDescuento ? parseFloat(totalConDescuento) - carrito.reduce((acc, item) => acc + parseFloat(item.precio), 0) : 0;

    let fecha = obtenerFechaFormato()

    const datosComprobante = {
        cliente: nombreCliente,
        fecha: fecha,
        numeroComprobante: `C-${Date.now()}`,
        productos: carrito.map(item => ({
            name: item.titulo_ps,
            cantidad: item.cantidad,
            price: item.precio
        })),
        descuento: descuento.toFixed(2),
        total: totalConDescuento || carrito.reduce((acc, item) => acc + parseFloat(item.precio), 0)
    };

    const token = localStorage.getItem("auth_token");

    try {
        const response = await fetch("http://localhost:3000/comprobante", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(datosComprobante)
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "comprobante.pdf";
            a.click();
            window.URL.revokeObjectURL(url);

            sessionStorage.clear();
            eliminarDelCarrito(userId);
        } else {
            const errorData = await response.json();
            console.error(`Error al generar el comprobante: ${errorData.message}`);
        }
    }
    catch (error) {
        console.error("Error al generar el comprobante:", error);
    }
}

function obtenerFechaFormato() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${dia}/${mes}/${anio}`;
}