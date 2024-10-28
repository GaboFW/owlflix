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
        alert("ERROR EN CONTRAS");
    }
}

btnRegistro.addEventListener("click", verificarDatos);
