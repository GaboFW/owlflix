function masTexto() {
    const moreText = document.getElementById("about-mas");
    const masInfo = document.getElementById("masInfo");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        masInfo.textContent = "Mostrar menos...";
    } else {
        moreText.style.display = "none";
        masInfo.textContent = "Mostrar más...";
    }
}