const getPage = new URLSearchParams(window.location.search);

const fromPage = getPage.get("from");
const toPage = getPage.get("to");

console.log(fromPage);
console.log(toPage);

setTimeout(function () {
    const ref = document.referrer;

    if (fromPage === "startpage" && toPage === "shop") {
        window.location.href = "shop.html";
    }
    else if (fromPage === "startpage" && toPage === "farm") {
        window.location.href = "farm.html";
    }
    else {
        window.location.href = "index.html";
        console.log("fel")
    }

}, 2000);
