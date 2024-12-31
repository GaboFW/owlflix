function $(id) {
    return document.getElementById(id);
}

const BACKEND_URL = "owlflix-dp57.vercel.app";

const btnRegistro = $("registroBtn");

/**
 * Verifica que la confirmacion de la contraseña sea igual a la contraseña
 */
function verificarContras() {
    const contraRegistro = $("Password");
    const confirmarContraRegistro = $("ConfirmarContraseña");

    if (contraRegistro.value !== confirmarContraRegistro.value) {
        Swal.fire({
            icon: "warning",
            title: "Error en contraseñas",
            text: "Las contraseñas no coinciden",
            showConfirmButton: false,
            timer: 1500
        });

        return false;
    }

    return true;
}

function verificarCaracteres() {
    const contraRegistro = $("Password");

    if (contraRegistro.value.length < 8) {
        Swal.fire({
            icon: "warning",
            title: "Error en contraseña",
            text: "La contraseña debe tener al menos 8 caracteres",
            showConfirmButton: false,
            timer: 2000
        });

        return false;
    }

    return true;
}

$("formRegistro").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!verificarContras() || !verificarCaracteres()) {
        return;
    }

    const nombre = $("Nombre").value;
    const apellido = $("Apellido").value;
    const email = $("Email").value;
    const passwd = $("Password").value;

    const response = await fetch(`${BACKEND_URL}/usuario/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, passwd: passwd })
    });

    const result = await response.json();
    console.log(result);

    if (result.message === "El mail ya existen") {
        Swal.fire({
            icon: "warning",
            title: "Error en email",
            text: "El email ya esta registrado",
            showConfirmButton: false,
            timer: 2000
        });

        return;
    }

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
    }
    else {
        console.error(result.message);
    }
});

btnRegistro.addEventListener("click", () => {
    verificarContras();
    verificarCaracteres();
});
