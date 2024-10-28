function $(id) {
    return document.getElementById(id);
}

function mostrarMensaje(e) {
    e.preventDefault();

    Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Se envió correctamente!",
        showConfirmButton: false,
        timer: 1500
    });
}

const form = $("formContacto").addEventListener("submit", mostrarMensaje);
