function masTexto() {
    const moreText = document.getElementById("about-mas");
    const masInfo = document.getElementById("masInfo");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
    } else {
        moreText.style.display = "none";
        masInfo.textContent = "Mostrar mas...";
    }
}