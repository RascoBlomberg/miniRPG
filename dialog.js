function LSgetDialogs() {
    return JSON.parse(localStorage.getItem("dialogs")) || {};
}

function createDialog({
    dialogKey,
    dialogTextEl = null,  // valfritt, skapas om null
    nextBtnEl = null,     // valfritt, skapas om null
    onStep,
    onFinish
}) {
    const dialogs = LSgetDialogs();
    const messages = dialogs[dialogKey];

    if (!messages) {
        console.warn("Dialog saknas:", dialogKey);
        return;
    }

    // --- Skapa elementen om de inte skickats in ---
    if (!dialogTextEl || !nextBtnEl) {
        const start = document.getElementById("start");
        if (!start) {
            console.error("Ingen #start container finns!");
            return;
        }

        const dialogBox = document.createElement("div");
        dialogBox.className = "dialog-box";

        dialogTextEl = document.createElement("p");
        dialogTextEl.id = "dialogText";

        nextBtnEl = document.createElement("button");
        nextBtnEl.id = "nextBtn";
        nextBtnEl.textContent = "Nästa";

        dialogBox.append(dialogTextEl, nextBtnEl);
        start.appendChild(dialogBox);
    }

    // --- Dialogflödet ---
    let index = 0;
    dialogTextEl.textContent = messages[index];

    nextBtnEl.onclick = () => {
        index++;

        if (onStep) {
            const shouldContinue = onStep({
                index,
                messages,
                dialogTextEl,
                nextBtnEl
            });

            if (shouldContinue === false) return;
        }

        if (index < messages.length) {
            dialogTextEl.textContent = messages[index];
        } else {
            onFinish?.();
        }
    };
}


function initDialogs() {
    if (!localStorage.getItem("dialogs")) {
        localStorage.setItem("dialogs", JSON.stringify({
            shop_first: [
                "Hej!",
                "Vad kul att se dig här.",
                "Har du 200 pengar?"
            ],
            shop_return: [
                "Du är tillbaka!",
                "Redo att handla?",
                "Låt oss se hur mycket pengar du har."
            ]
        }));
    }
}