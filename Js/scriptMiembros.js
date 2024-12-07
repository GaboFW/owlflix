function $(id) {
    return document.getElementById(id);
}

const botonesMiembro = document.querySelectorAll(".miembrosBtn");

botonesMiembro.forEach(boton => {
    boton.addEventListener("click", async () => {
        const userId = await idUsuario();

        if (!userId) {
            Swal.fire({
                icon: "warning",
                title: "Inicie Sesion",
                text: "Debe iniciar sesion",
                showConfirmButton: false,
                timer: 1500
            });
        }

        const psId = boton.getAttribute("data-id");
        const nombrePlan = boton.getAttribute("data-nombre");
        const precio = boton.getAttribute("data-precio");

        console.log("Precio enviado:", parseFloat(precio));

        agregarAlCarrito(userId, psId, parseFloat(precio));
    });
});

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

async function agregarAlCarrito(usuarioId, psId, precio) {
    try {
        const response = await fetch("http://localhost:3000/carrito", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuarioId, psId: psId, precio: precio })
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Agregado al carrito",
                text: "El miembro se ha añadido correctamente al carrito.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
    }
}
