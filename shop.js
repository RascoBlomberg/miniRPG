// Progress[ ]
// 0 - moneyValue
// 1 - start tutorial panel
// 2 - shop tutorial panel 1
// 3 - farm tutorial panel
// 4 - shop tutorial panel 2

function LSloadProgress() {
    if (localStorage.getItem("progress")) {
        progress = JSON.parse(localStorage.getItem("progress"));
    } else {
        progress = [20, false, false, false, false]; // default värden
        localStorage.setItem("progress", JSON.stringify(progress));
    }
}


function LSsaveProgress() {
    localStorage.progress = JSON.stringify(progress);
}

LSloadProgress();
let moneyValue = progress[0];

function renderShop() {
    const start = document.getElementById("start");
    if (!start) {
        console.warn("Ingen #start div finns i HTML");
        return;
    }
    start.innerHTML = "";

    const bg = document.createElement("img");
    bg.src = "assets/shopREF.jpg";
    bg.style.width = "100vw";
    bg.style.height = "100vh";
    bg.style.position = "absolute";
    bg.style.zIndex = "-1";

    start.append(bg);

    LSloadProgress();


    let dialogKey;
    if (!progress[2]) {
        dialogKey = "shop_first";
    } else if (!progress[4]) {
        dialogKey = "shop_return";
    } else {
        dialogKey = null;
    }

    if (dialogKey) {
        const start = document.getElementById("start");
        if (!start) {
            console.warn("Ingen #start div finns i HTML");
            return;
        }

        createDialog({
            dialogKey: dialogKey,
            onStep: ({ index, messages, dialogTextEl }) => {
                if (dialogKey === "shop_first" && index === 2 && moneyValue < 200) {
                    messages[2] = `Följande belopp har du: ${moneyValue}, inte tillräckligt`;
                    dialogTextEl.textContent = messages[2];

                    setTimeout(() => renderFarm(), 2000);
                    return false;
                }
                if (dialogKey === "shop_first" && index === 2 && moneyValue >= 200) {
                    messages[2] = `${moneyValue}, ah perfekt`;
                }
            },
            onFinish: () => {
                if (dialogKey === "shop_first") progress[2] = true;
                if (dialogKey === "shop_return") progress[4] = true;

                LSsaveProgress();
                renderFarm();
            }
        });
    }
}