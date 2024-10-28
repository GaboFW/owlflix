function cambiarModo() {
    document.documentElement.classList.toggle("light-mode");

    const theme = document.documentElement.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", theme);
}

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "light") {
        document.documentElement.classList.add("light-mode");
    }
});

