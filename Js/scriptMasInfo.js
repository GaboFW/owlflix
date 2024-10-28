function $(id) {
    return document.getElementById(id);
}

/**
 * Crea el boton "Mostrar mas..."
 */
function masTexto() {
    const moreText = $("about-mas");
    const masInfo = $("masInfo");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        masInfo.textContent = "Mostrar menos...";
    } else {
        moreText.style.display = "none";
        masInfo.textContent = "Mostrar más...";
    }
}