let moneyValue = 20;
const plantCost = 2;
const harvestGain = 5;
const numPlants = 8;

let plants = Array(numPlants).fill(false);
let isMouseDown = false;

window.addEventListener("DOMContentLoaded", LSloadProgress);

//let moneyValue = 20;

const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const box6 = document.querySelector(".box6");
const box7 = document.querySelector(".box7");

//document.getElementById("myBox").textContent = moneyValue;
/*
btn.addEventListener("click", () => {
    box.classList.add("expanded");
    box1.classList.add("expanded");
    box2.classList.add("expanded");
    box3.classList.add("expanded");
}); 
*/
//varje planta borde kosta 2mV för att växa

const colorCycle = [
"#FFFF66",
"#CCFF66",
"#99FF66",
"#66FF66",
"#33CC33",
];

let plantGrowNumb = [];
const nightTimeCycle= [
     "assets/sol2.png", "assets/sol3.png", "assets/moon1.png", "assets/moon2.png", "assets/moon3.png", "assets/sol1.png",
];

nightTimeCycle.forEach(src => {
    const img = new Image();
    img.src = src;
});

function growPlant(){
    if (moneyValue >= 20){
        for (let i = 0; i < moneyValue; i++) {
            if (!plantGrowNumb[i]) plantGrowNumb[i] = [];

            
            let boxClass = "box" + i;
            if (!document.querySelector("." + boxClass)) {
                    const box = document.createElement("div");
                    box.className = boxClass;
                    box.style.width = "100px";
                    box.style.height = "50px";
                    box.style.backgroundColor = "yellow";
                    box.style.position = "absolute";
                    box.style.top = "700px";
                    box.style.right = `${1210 - i*110}px`;
                    box.style.transformOrigin = "bottom";
                    box.style.transition = "transform 0.3s ease";

                    
                    box.addEventListener("mousemove", () => {
                        if (isMouseDown && box.classList.contains("expanded")) {
                            moneyValue += harvestGain;
                            box.classList.remove("expanded");
                            box.style.backgroundColor = "yellow";
                            updateMoney();
                        }
                    });

                    document.getElementById("start").appendChild(box);
                }
            plantGrowNumb[i].push("box"+i)
            if (i == 9){
                moneyValue = moneyValue - (i*2);
                break;
            }
        }
        
        plantGrowNumb.forEach(boxArray => {
            boxArray.forEach(boxClass => {
                const box = document.querySelector("." + boxClass);
                box?.classList.add("expanded");
            });
        });

    for (let i = 0; i <= 5; i++) {
        setTimeout(() => {
            document.body.style.backgroundImage = `url("${nightTimeCycle[i]}")`;
            plantGrowNumb.forEach(boxArray => {
                boxArray.forEach(boxClass => {
                    const box = document.querySelector("." + boxClass + ".expanded");
                    if (box) {
                        box.style.backgroundColor = colorCycle[i];
                    }
                });
            }); 
        }, 1000 * i);
        if (i == 6) document.body.style.backgroundImage = 'url("assets/sol1.png")';
    }
    

    document.getElementById("myBox").textContent = moneyValue;      
    } else {
        alert("inte tillräckligt med pengar");
    }
}

function MoneyUp() {
    moneyValue++;
    document.getElementById("myBox").textContent = moneyValue;
    return moneyValue;
}

/*
function setupBox(box) {
    let lastMoveTime = 0;

    document.addEventListener("mousedown", () => {
        const now = performance.now();
        box.addEventListener("mousemove", () => {
            lastMoveTime = performance.now();
                const now = performance.now();
            if (now - lastMoveTime <= 100) {
                console.log("mousemove hände nyligen!");
                box.classList.remove("expanded");
            } else {
                console.log("mousemove var FÖR LÄNGE sedan.");
            }
        })
    });

}
*/




//let isMouseDown = false;


document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});


function setupBox(box) {
    let lastMoveTime = 0;

    
    box.addEventListener("mousemove", () => {
        lastMoveTime = performance.now();

        
        if (isMouseDown) {
            const now = performance.now();
            if (now - lastMoveTime <= 100) {
                console.log(`mousemove + mousedown på ${box.className}`);
                if (box.classList.length > 1) {moneyValue += 5;}
                box.classList.remove("expanded");
                box.style.backgroundColor = "yellow";
                document.getElementById("myBox").textContent = moneyValue;
                return moneyValue;
            }
        }
    });

   

}


const boxes = document.querySelectorAll(".box1, .box2, .box3, .box4, .box5, .box6, .box7, .box8");

boxes.forEach(box => setupBox(box));

//document.body.style.backgroundImage = 'url("assets/sol1.png")';

// progress element 
// 0 - moneyValue
// 1 - start turtorial panel
// 2 - shop turtorial panel 1
// 3 - farm turtorial panel
// 4 - shop turtorial panel 2



function returnHome() {
    progress[0] = moneyValue;
    localStorage.progress = JSON.stringify(progress);

    window.location.href = "loading.html";
}

function LSloadProgress() {
    if (!localStorage.progress) return;
    progress = JSON.parse(localStorage.progress);
}


function renderFarm() {
    const start = document.getElementById("start");
    if (!start) {
        console.warn("Ingen #start div finns i HTML");
        return;
    }
    start.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = "Farmen";

    const info = document.createElement("p");
    info.textContent = "Klicka på 'Plantera' för att odla. Dra med musen över växter för att skörda.";

    const moneyDisplay = document.createElement("div");
    moneyDisplay.id = "money";
    moneyDisplay.textContent = `Pengar: ${moneyValue}`;

    const plantBtn = document.createElement("button");
    plantBtn.textContent = `Plantera (kostar ${plantCost})`;
    plantBtn.addEventListener("click", () => {
        growPlant();
        moneyDisplay.textContent = `Pengar: ${moneyValue}`;
    });

    const sign = document.createElement("div");
    sign.className = "sign";

    const signBoard = document.createElement("div");
    signBoard.className = "sign-board";

    const moneyBtn = document.createElement("button");
    moneyBtn.textContent = "Få pengar (+1)";
    moneyBtn.addEventListener("click", () => {
        moneyValue++;
        moneyDisplay.textContent = `Pengar: ${moneyValue}`;
    });

    const returnBtn = document.createElement("button");
    returnBtn.textContent = "Gå hem";
    returnBtn.addEventListener("click", () => alert("Hem-knapp fungerar här"));

    signBoard.append(moneyBtn, returnBtn);
    sign.appendChild(signBoard);

    const grid = document.createElement("div");
    grid.className = "farm-grid";

    const oldBoxes = document.querySelectorAll(".box1, .box2, .box3, .box4, .box5, .box6, .box7, .box8");
    oldBoxes.forEach(box => {
        grid.appendChild(box);
    });

    start.append(title, info, moneyDisplay, plantBtn, grid, sign);
}