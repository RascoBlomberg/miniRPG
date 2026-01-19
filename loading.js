function renderEnd() {
    const start = document.getElementById("start");
    if (!start) {
        console.warn("Ingen #start div finns i HTML");
        return;
    }

    start.innerHTML = "";

    const bg = document.createElement("img");
    bg.id = "bg";
    bg.src = "assets/Loading.png";
    bg.style.width = "100vw";
    bg.style.height = "100vh";
    bg.style.position = "absolute";
    bg.style.zIndex = "-1";

    const container = document.createElement("div");
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.textAlign = "center";
    container.style.color = "white";

    const title = document.createElement("h1");
    title.textContent = "Tack för att du har spelat";
    title.style.fontSize = "4rem";
    title.style.marginBottom = "2rem";

    const text = document.createElement("p");
    text.textContent = "Spela igen";
    text.style.fontSize = "2rem";
    text.style.marginBottom = "1.5rem";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Starta om";
    restartBtn.style.fontSize = "1.2rem";
    restartBtn.style.padding = "10px 25px";
    restartBtn.addEventListener("click", () => {
        localStorage.removeItem("progress");
        renderStart();
    });

    container.append(title, text, restartBtn);
    start.append(bg, container);
}
