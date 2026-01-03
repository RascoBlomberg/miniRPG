const messages1 = [
    "Halt! För att komma in i butiken behöver du betala ett arvode på 200 guldmynt",
    "Hmmmm, verkar som du inte har tillräckligt",
    "Gå ner till farmen och odla lite och kom tillbaka när du har råd.",
    "Hej då!",
];

const messages2 = [
    "Ah du är tillbaka",
    "Få se nu, har du tillräckligt med dig?",
    "195, 196, 197, 198, 199, 200, ah perfekt",
    "Varsågod vidare",
];

// Progress[ ]
// 0 - moneyValue
// 1 - start tutorial panel
// 2 - shop tutorial panel 1
// 3 - farm tutorial panel
// 4 - shop tutorial panel 2
let progress = [0, false, false, false, false];

function LSloadProgress() {
    if (localStorage.progress) {
        progress = JSON.parse(localStorage.progress);
    }
}

function LSsaveProgress() {
    localStorage.progress = JSON.stringify(progress);
}

LSloadProgress();

const dialogVisited = progress[2];
const moneyValue = progress[0];

let messages = dialogVisited ? [...messages2] : [...messages1];

let currentMessage = 0;

const dialogText = document.getElementById("dialogText");
const nextBtn = document.getElementById("nextBtn");

dialogText.textContent = messages[currentMessage];

nextBtn.addEventListener("click", () => {

    currentMessage++;


    if (dialogVisited && currentMessage === 2) {
        if (moneyValue < 200) {
            messages[2] = `Följande belopp har du: ${moneyValue}, inte tillräckligt`;

            dialogText.textContent = messages[2];

            setTimeout(() => {
                window.location.href = "loading.html";
            }, 2000);

            return;
        }
    }

    if (dialogVisited && currentMessage === 2) {
        messages[2] = `${moneyValue}, ah perfekt`;
    }

    if (currentMessage < messages.length) {
        dialogText.textContent = messages[currentMessage];
    } else {
        progress[2] = true;
        LSsaveProgress();
        window.location.href = "loading.html";
    }
});
