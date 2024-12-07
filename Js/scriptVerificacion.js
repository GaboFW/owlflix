function $(id) {
    return document.getElementById(id);
}

const btnRegistro = $("registroBtn");

/**
 * Verifica que la confirmacion de la contraseña sea igual a la contraseña
 */
function verificarDatos() {
    const contraRegistro = $("Password");
    const confirmarContraRegistro = $("ConfirmarContraseña");

    if (contraRegistro.value !== confirmarContraRegistro.value) {
        alert("Error en contraseñas");
    }
}

$("formRegistro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = $("Nombre").value;
    const apellido = $("Apellido").value;
    const email = $("Email").value;
    const passwd = $("Password").value;

    const response = await fetch("http://localhost:3000/usuario/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, passwd: passwd })
    });

    const result = await response.json();
    if (response.ok) {
        Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "Se registro correctamente",
            showConfirmButton: false,
            timer: 2000
        })
        .then(() => {
            window.location.href = "login.html";
        });
        
    } else {
        console.error(result.error || "Error en el registro");
    }
});

btnRegistro.addEventListener("click", verificarDatos);
