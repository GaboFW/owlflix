const URL_BACKEND = "https://backend-owlflix.vercel.app";

document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("opciones");
    for (let i = 1; i <= 2000; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;

        select.appendChild(option);
    }

    esAdmin();
});

document.getElementById("formUpgrade").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("opciones").value;
    const sinopsis = document.getElementById("sinopsis");

    try {
        // const response = await fetch(`http://localhost:3000/peliculas-series/${id}/sinopsis`, {
        const response = await fetch(`${URL_BACKEND}/peliculas-series/${id}/sinopsis`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sinopsis: sinopsis.value })
        });

        if (response.ok) {
            sinopsis.value = "";

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Sinopsis Modificada",
                    text: "La sinopsis ha sido modificada correctamente.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        else {
            console.error("Error al actualizar", error.message);
        }
    }
    catch (error) {
        console.error("Hubo un error al conectar con el servidor.", error.message);
    }
});

async function esAdmin() {
    try {
        const token = localStorage.getItem("auth_token");
        // const response = await fetch(`http://localhost:3000/usuario/session`, {
        const response = await fetch(`${URL_BACKEND}/usuario/session`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            credentials: "include"
        });

        const result = await response.json();

        const id = result.user.id;

        if (id === 1 || id === 2) {
            document.getElementById("divUpgrade").style.display = "block";
            document.getElementById("divfuncionAdmin").style.display = "block";
        } else {
            document.getElementById("divUpgrade").style.display = "none";
            document.getElementById("divfuncionAdmin").style.display = "none";
        }
    } catch (error) {
        console.error("Error al intentar verificar si el usuario es admin:", error.message);
    }
}
