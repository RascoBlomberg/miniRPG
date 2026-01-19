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
    progress[0] = moneyValue;
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
        dialogKey = "shop_return";
    }

    if (dialogKey) {
        const start = document.getElementById("start");
        if (!start) {
            console.warn("Ingen #start div finns i HTML");
            return;
        }

        createDialog({
            dialogKey: dialogKey,
            onStep: ({ index, dialogTextEl }) => {
                if (index === 3) {
                    if (moneyValue < 200) {
                        dialogTextEl.textContent = `Följande belopp har du: ${moneyValue}, inte tillräckligt. Tillbaka till farmen för dig`;
                        setTimeout(() => renderFarm(), 7000);
                        return false
                        
                    }else {
                        dialogTextEl.textContent = `${moneyValue}, ah perfekt`;
                        setTimeout(() => renderEnd(), 3500);
                        return false
                    }
                }
            },
            onFinish: () => {
                if (dialogKey === "shop_first") progress[2] = true;
                if (dialogKey === "shop_return") progress[4] = true;

                LSsaveProgress();
                if (dialogKey === "shop_first") setTimeout(() => renderFarm(), 3000);
                if (dialogKey === "shop_return" && moneyValue < 200)renderStart();
            }
        });
    }
}