function renderStart() {
    LSloadProgress();
    const start = document.getElementById("start");
    if (!start) {
        console.warn("Ingen #start div finns i HTML");
        return;
    }

    start.innerHTML = "";



    const bg = document.createElement("div");
    bg.className = "start-bg";

    bg.style.backgroundImage = 'url("assets/start.png")';
    bg.style.backgroundSize = "contain";
    bg.style.backgroundPosition = "center";
    bg.style.backgroundRepeat = "no-repeat";
    bg.style.width = "100vw";
    bg.style.height = "95vh";
    bg.style.position = "center";
    bg.style.top = "0";
    bg.style.left = "0";
    bg.style.zIndex = "-1";
    bg.style.backgroundColor = "#7B3F00";

    start.appendChild(bg);


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

    start.append(shopBtn, farmBtn);

    if (progress[1] == false) {
        createDialog({
            dialogKey: "start_intro",
            onStep: ({ index }) => {
                if (index == 2) {
                    shopBtn.style.border = "5px solid green";
                    setTimeout(() => shopBtn.style.border = "", 2000);
                }
                if (index == 3) {
                    farmBtn.style.border = "5px solid green";
                    setTimeout(() => farmBtn.style.border = "", 2000);
                }
            },
            onFinish: () => {
                progress[1] = true;
                LSsaveProgress();

            }
        });
    };

}

