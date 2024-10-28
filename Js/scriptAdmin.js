function $(id) {
    return document.getElementById(id);
}

const email = $("Email");
const contra = $("PasswordLogin");
const boton = $("botonInicioSesion");

boton.addEventListener("click", () => {
    if (email.value.toLowerCase() === "pepito@admin.com" && contra.value === "admin"){

        alert("Modo admin ACTIVATED");
    }
});