// Obtener datos del sessionStorage
const productos = JSON.parse(sessionStorage.getItem('productos'));
const total = parseInt(sessionStorage.getItem('total')); // Total ya calculado
const descuentoAplicado = sessionStorage.getItem('descuento') === 'true'; // Determinar si hay descuento aplicado

// Mostrar productos en el resumen
const productosDiv = document.getElementById('productos');
productos.forEach(producto => {
    const p = document.createElement('p');
    p.textContent = `${producto.name} - ${producto.price}`;
    productosDiv.appendChild(p);
});

// Mostrar el total y el descuento (si corresponde)
const totalDiv = document.getElementById('total-compra');
if (descuentoAplicado) {
    totalDiv.innerHTML = `
        <p>Subtotal: $2000</p>
        <p>Descuento (DONPOZO): -$299</p>
        <p class="total">Total: $${total}</p>
    `;
} else {
    totalDiv.innerHTML = `<p class="total">Total: $${total}</p>`;
}

// Manejo del formulario
const formPago = document.getElementById('form-pago');
formPago.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Compra realizada con éxito. Gracias por tu compra.');
    // Aquí se podría redirigir o limpiar el sessionStorage si es necesario
    sessionStorage.clear();
});

// Validación en tiempo real
document.getElementById('tarjeta').addEventListener('input', function (e) {
    const input = e.target;
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const blocks = [];

    for (let i = 0; i < value.length; i += 4) {
        blocks.push(value.substring(i, i + 4));
    }

    input.value = blocks.join(' ').substring(0, 19); // Limitar a 19 caracteres (16 dígitos + 3 espacios)

    // Mostrar tipo de tarjeta
    const tarjetaIcono = document.getElementById('icono-tarjeta');
    if (/^4/.test(value)) {
        tarjetaIcono.textContent = 'Visa';
    } else if (/^5[1-5]/.test(value)) {
        tarjetaIcono.textContent = 'MasterCard';
    } else {
        tarjetaIcono.textContent = ''; // Sin ícono
    }
});

document.getElementById('vencimiento').addEventListener('input', function (e) {
    const input = e.target;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
        input.value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
});

// Validar al enviar
document.getElementById('form-pago').addEventListener('submit', function (e) {
    e.preventDefault();

    const tarjeta = document.getElementById('tarjeta').value.replace(/\s+/g, '');
    const vencimiento = document.getElementById('vencimiento').value;
    const cvv = document.getElementById('cvv').value;

    if (tarjeta.length !== 16 || !/^\d+$/.test(tarjeta)) {
        alert('Número de tarjeta inválido.');
        return;
    }

    const [mes, anio] = vencimiento.split('/');
    if (!mes || !anio || mes < 1 || mes > 12 || anio < new Date().getFullYear() % 100) {
        alert('Fecha de vencimiento inválida.');
        return;
    }

    if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
        alert('CVV inválido.');
        return;
    }

    alert('Pago realizado con éxito. ¡Gracias por tu compra!');
    sessionStorage.clear(); // Limpiar datos del carrito
});