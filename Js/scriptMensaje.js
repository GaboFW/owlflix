function $(id) {
    return document.getElementById(id);
}

function mostrarMensaje(e) {
    e.preventDefault();

    Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "¡Se envió correctamente!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'small-swal'
        }
    });
}

const form = $("formContacto").addEventListener("submit", mostrarMensaje);
