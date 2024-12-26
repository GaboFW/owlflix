function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
    validarSesion();
});

$("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    iniciarSesion();
});

$("logoutButton").addEventListener("click", async () => {
    await fetch("http://localhost:3000/usuario/logout", { 
        method: "POST",
        credentials: "include"
    });

    location.reload();

    cerrarSesion();
});

async function iniciarSesion() {
    const email = $("Email").value;
    const passwd = $("PasswordLogin").value;

    const response = await fetch("http://localhost:3000/usuario/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, passwd }),
        credentials: "include",
    });

    const result = await response.json();

    if (result.message === "Credenciales no válidas") {
        Swal.fire({
            icon: "warning",
            title: "Error en email o contraseña",
            text: "El email o contraseña son incorrectos",
            showConfirmButton: false,
            timer: 2000
        });

        return;
    }

    if (response.ok) {
        const token = response.headers.get("Authorization")?.split(" ")[1];

        if (token) {
            localStorage.setItem("auth_token", token);

            window.location.href = "../index.html";
        }
    }
    else {
        console.error(result.message);
    }
}

async function validarSesion() {
    try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://localhost:3000/usuario/session", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            credentials: "include"
        });
        const data = await response.json();

        if (data.loggedIn) {
            $("sessionForm").style.display = "block";
            $("login-form").style.display = "none";
        } else {
            $("login-form").style.display = "block";
            $("sessionForm").style.display = "none";
        }      
    }
    catch (error) {
        console.error("Error verificando sesión:", error);
        $("login-form").style.display = "block";
        $("sessionForm").style.display = "none";
    }
}

async function cerrarSesion() {
    localStorage.removeItem("auth_token");
}
