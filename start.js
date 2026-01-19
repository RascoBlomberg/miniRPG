function renderStartPage() {
    const start = document.getElementById("start");
    if (!start) {
        console.warn("Ingen #start div finns i HTML");
        return;
    }

    start.innerHTML = "";

    const bg = document.createElement("div");
    bg.className = "start-bg";

    const shopBtn = document.createElement("button");
    shopBtn.className = "map-button shop";
    shopBtn.setAttribute("aria-label", "Gå till shoppen");
    shopBtn.addEventListener("click", () => {
        renderShop();
    });

    const farmBtn = document.createElement("button");
    farmBtn.className = "map-button farm";
    farmBtn.setAttribute("aria-label", "Gå till farmen");
    farmBtn.addEventListener("click", () => {
        renderFarm();
    });

    start.append(bg, shopBtn, farmBtn);
}

window.addEventListener("DOMContentLoaded", () => {
    renderStartPage();
});