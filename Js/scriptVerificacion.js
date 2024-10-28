function $(id) {
    return document.getElementById(id);
}

const btnRegistro = $("registroBtn");

function verificarDatos() {
    const contraRegistro = $("Password");
    const confirmarContraRegistro = $("ConfirmarContraseña");

    if (contraRegistro.value !== confirmarContraRegistro.value) {
        alert("ERROR EN CONTRAS");
    }
}

btnRegistro.addEventListener("click", verificarDatos);
