function LSgetDialogs() {
    return JSON.parse(localStorage.getItem("dialogs")) || {};
}

function createDialog({
    dialogKey,
    dialogTextEl = null,
    nextBtnEl = null,
    onStep,
    onFinish
}) {
    const dialogs = LSgetDialogs();
    const messages = dialogs[dialogKey];

    if (!messages) {
        console.warn("Dialog saknas:", dialogKey);
        return;
    }

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
            const dialogBox = dialogTextEl.parentElement;
            if (dialogBox) dialogBox.remove();
            onFinish?.();
        }
    };
}


function initDialogs() {
    if (!localStorage.getItem("dialogs")) {
        localStorage.setItem("dialogs", JSON.stringify({
            shop_first: [
                "Hej!",
                `"Vad kul att se dig här. ${moneyValue}"`,
                "Har du 200 pengar?"
            ],
            shop_return: [
                "Du är tillbaka! ",
                "Redo att handla?",
                "Låt oss se hur mycket pengar du har.",
                "placeholder"
            ],
            start_intro: [
                "Hej och välkommen till fylkes farm.",
                "Här kan du odla och *Placeholder ta bort inför launch*", /* hehe */
                "du kan antingen gå till shopen.", /* lyss upp dörren */
                "eller så kan du bege dig till farmen för att odla lite.", /* lyss up farmen */
                "Vi kan börja med att checka in i shopen."
            ],
            farm_intro: [
                "Hej och välkomen till farmen",
                "Här kan du odla gröddor, detta genom att klicka på plantera knappen.",
                "När man planterar så kostar det 2 mynt pär planta.",
                "Efter det så får du vänta en dag tills du kan skörda dem.",
                "Du kan genomföra en skörd när plantan är grön och sen ignom att hålla inne musen och dra över plantan"
            ]
        }));
    }
}