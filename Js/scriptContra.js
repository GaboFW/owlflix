function $(id) {
    return document.getElementById(id);
}

const iconPassword = $("ojoContra");
const iconConfirmar = $("ojoConfirmar");
const iconLogin = $("ojoLogin");

if (iconPassword) {
    iconPassword.addEventListener("click", () => {
        mostrarContra("Password", iconPassword);
    });
}

if (iconConfirmar) {
    iconConfirmar.addEventListener("click", () => {
        mostrarContra("ConfirmarContraseña", iconConfirmar);
    });
}

if (iconLogin){
    iconLogin.addEventListener("click", () => {
        mostrarContra("PasswordLogin", iconLogin);
    });
}

function mostrarContra(inputId, iconElement) {
    const input = $(inputId);

    if (input.type === "password") {
        input.type = "text";
        iconElement.setAttribute("src", "../Imagenes/Ojo abierto.png");
    } else {
        input.type = "password";
        iconElement.setAttribute("src", "../Imagenes/Ojo cerrado.png");
    }
}
