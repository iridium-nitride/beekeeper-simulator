const priceIncrement = 1.15

const beesBase = 0;
const honeyBase = 0;
const beesSecondBase = 0;
const honeyBeeBase = 0.01;
const beesClickBase = 1;

const beeLimitBase = 500;
const honeyLimitBase = 2000;

let bees = parseInt(localStorage.getItem(`bees`)) || beesBase;
let honey = parseFloat(localStorage.getItem(`honey`)) || honeyBase;

let beesSecond, honeyBee, beesClick, beeLimit, honeyLimit;

const unitDivsExceptFirst = document.querySelectorAll(`.unit:not(:first-of-type)`);
unitDivsExceptFirst.forEach(unit => unit.classList.add(`hidden`));

const unitPurchaseEvent = new CustomEvent(`unitPurchased`);
const units = {
    beebox: parseInt(localStorage.getItem(`beeboxUnit`)) || 0,
    interviewer: parseInt(localStorage.getItem(`interviewerUnit`)) || 0,
    flowergarden: parseInt(localStorage.getItem(`flowergardenUnit`)) || 0,
    honeycrate: parseInt(localStorage.getItem(`honeycrateUnit`)) || 0,
    queenbee: parseInt(localStorage.getItem(`queenbeeUnit`)) || 0,
    smoker: parseInt(localStorage.getItem(`smokerUnit`)) || 0,
    smallhive: parseInt(localStorage.getItem(`smallhiveUnit`)) || 0,
    honeyfridge: parseInt(localStorage.getItem(`honeyfridgeUnit`)) || 0,
    bighive: parseInt(localStorage.getItem(`bighiveUnit`)) || 0,
    noneuclideanhoneycellar: parseInt(localStorage.getItem(`noneuclideanhoneycellarUnit`)) || 0,

    beeboxPriceBase: 500,
    interviewerPriceBase: 800,
    flowergardenPriceBase: 1200,
    honeycratePriceBase: 1800,
    queenbeePriceBase: 3000,
    smokerPriceBase: 6000,
    smallhivePriceBase: 12000,
    honeyfridgePriceBase: 18000,
    bighivePriceBase: 32000,
    noneuclideanhoneycellarPriceBase: 50000,

    beeboxPrice: 0,
    interviewerPrice: 0,
    flowergardenPrice: 0,
    honeycratePrice: 0,
    queenbeePrice: 0,
    smokerPrice: 0,
    smallhivePrice: 0,
    honeyfridgePrice: 0,
    bighivePrice: 0,
    noneuclideanhoneycellarPrice: 0,
}

const achievements = {
    firstAchievement: localStorage.getItem(`firstAchievement`) || false,
    secondAchievement: localStorage.getItem(`secondAchievement`) || false,
    thirdAchievement: localStorage.getItem(`thirdAchievement`) || false,
    fourthAchievement: localStorage.getItem(`fourthAchievement`) || false,
    fifthAchievement: localStorage.getItem(`fifthAchievement`) || false,
}

checkImpact();
refreshNumbers();

function refreshNumbers(){
    document.querySelector(`#beesCounter`).textContent = bees;
    document.querySelector(`#honeyCounter`).textContent = Math.floor(honey);
    document.querySelector(`#beesSecondCounter`).textContent = beesSecond;
    document.querySelector(`#honeyBeeCounter`).textContent = honeyBee;
    document.querySelector(`#beesClickCounter`).textContent = beesClick;
    document.querySelector(`#honeySecondCounter`).textContent = (honeyBee * bees).toFixed(2);

    document.querySelector(`#beeLimitCounter`).textContent = Math.floor(beeLimit);
    document.querySelector(`#honeyLimitCounter`).textContent = Math.floor(honeyLimit);

    document.querySelector(`#beeboxUnitCounter`).textContent = units.beebox;
    document.querySelector(`#interviewerUnitCounter`).textContent = units.interviewer;
    document.querySelector(`#flowergardenUnitCounter`).textContent = units.flowergarden;
    document.querySelector(`#honeycrateUnitCounter`).textContent = units.honeycrate;
    document.querySelector(`#queenbeeUnitCounter`).textContent = units.queenbee;
    document.querySelector(`#smokerUnitCounter`).textContent = units.smoker;
    document.querySelector(`#smallhiveUnitCounter`).textContent = units.smallhive;
    document.querySelector(`#honeyfridgeUnitCounter`).textContent = units.honeyfridge;
    document.querySelector(`#bighiveUnitCounter`).textContent = units.bighive;
    document.querySelector(`#noneuclideanhoneycellarUnitCounter`).textContent = units.noneuclideanhoneycellar;

    document.querySelector(`#beeboxUnitPriceCounter`).textContent = units.beeboxPrice;
    document.querySelector(`#interviewerUnitPriceCounter`).textContent = units.interviewerPrice;
    document.querySelector(`#flowergardenUnitPriceCounter`).textContent = units.flowergardenPrice;
    document.querySelector(`#honeycrateUnitPriceCounter`).textContent = units.honeycratePrice;
    document.querySelector(`#queenbeeUnitPriceCounter`).textContent = units.queenbeePrice;
    document.querySelector(`#smokerUnitPriceCounter`).textContent = units.smokerPrice;
    document.querySelector(`#smallhiveUnitPriceCounter`).textContent = units.smallhivePrice;
    document.querySelector(`#honeyfridgeUnitPriceCounter`).textContent = units.honeyfridgePrice;
    document.querySelector(`#bighiveUnitPriceCounter`).textContent = units.bighivePrice;
    document.querySelector(`#noneuclideanhoneycellarUnitPriceCounter`).textContent = units.noneuclideanhoneycellarPrice;
}

function checkImpact(){
    //REMEMBER TO EDIT THESE WHEN ADDING NEW UNITS
    beesSecond = beesSecondBase + (units.queenbee * 1);
    honeyBee = honeyBeeBase + (units.flowergarden * 0.01) + (units.smoker * 0.1) + (units.bighive * 0.5);
    beesClick = beesClickBase + (units.interviewer * 1);

    beeLimit = beeLimitBase + (units.beebox * 150) + (units.smallhive * 1000) + (units.bighive * 5000);
    let baseHoneyLimit = honeyLimitBase + (units.honeycrate * 1000) + (units.honeyfridge * 12000);
    honeyLimit = baseHoneyLimit * (1.2 ** units.noneuclideanhoneycellar);

    units.beeboxPrice = Math.floor(units.beeboxPriceBase * (priceIncrement ** units.beebox));
    units.interviewerPrice = Math.floor(units.interviewerPriceBase * (priceIncrement ** units.interviewer));
    units.flowergardenPrice = Math.floor(units.flowergardenPriceBase * (priceIncrement ** units.flowergarden));
    units.honeycratePrice = Math.floor(units.honeycratePriceBase * (priceIncrement ** units.honeycrate));
    units.queenbeePrice = Math.floor(units.queenbeePriceBase * (priceIncrement ** units.queenbee));
    units.smokerPrice = Math.floor(units.smokerPriceBase * (priceIncrement ** units.smoker));
    units.smallhivePrice = Math.floor(units.smallhivePriceBase * (priceIncrement ** units.smallhive));
    units.honeyfridgePrice = Math.floor(units.honeyfridgePriceBase * (priceIncrement ** units.honeyfridge));
    units.bighivePrice = Math.floor(units.bighivePriceBase * (priceIncrement ** units.bighive));
    units.noneuclideanhoneycellarPrice = Math.floor(units.noneuclideanhoneycellarPriceBase * (priceIncrement ** units.noneuclideanhoneycellar));

    //ACHIEVEMENTS

        //first
    if (bees >= 1){
        achievements.firstAchievement = true;
        document.querySelector(`#firstAchievement`).classList.add(`achieved`);
    };
        //second
    if (honey >= 100){
        achievements.secondAchievement = true;
        document.querySelector(`#secondAchievement`).classList.add(`achieved`);
    };
        //third
    document.addEventListener("unitPurchased", () => {
        achievements.thirdAchievement = true;
        document.querySelector(`#thirdAchievement`).classList.add(`achieved`);
    });
        //fourth
    if (bees == beeLimit){
        achievements.fourthAchievement = true;
        document.querySelector(`#fourthAchievement`).classList.add(`achieved`);
    };
        //fifth
    if (honey == honeyLimit){
        achievements.fifthAchievement = true;
        document.querySelector(`#fifthAchievement`).classList.add(`achieved`);
    };

    //UNIT HIDING THINGY

    if (honey >= (units.interviewerPrice / 2)){
        document.querySelector(`#interviewerUnit`).classList.remove(`hidden`);
    };

    if (honey >= (units.flowergardenPrice / 2)){
        document.querySelector(`#flowergardenUnit`).classList.remove(`hidden`);
    };

    if (honey >= (units.honeycratePrice / 2)){
        document.querySelector(`#honeycrateUnit`).classList.remove(`hidden`);
    };

    if (honey >= (units.queenbeePrice / 2)){
        document.querySelector(`#queenbeeUnit`).classList.remove(`hidden`);
    };

    if (honey >= (units.smokerPrice / 2)){
        document.querySelector(`#smokerUnit`).classList.remove(`hidden`);
    };
    
    if (honey >= (units.smallhivePrice / 2)){
        document.querySelector(`#smallhiveUnit`).classList.remove(`hidden`);
    };

    if (honey >= (units.honeyfridgePrice / 2)){
        document.querySelector(`#honeyfridgeUnit`).classList.remove(`hidden`);
    };

    if (honey >= (units.bighivePrice / 2)){
        document.querySelector(`#bighiveUnit`).classList.remove(`hidden`);
    };

    if (honey >= (units.noneuclideanhoneycellarPrice / 2)){
        document.querySelector(`#noneuclideanhoneycellarUnit`).classList.remove(`hidden`);
    };
}

function generateHoney(){
    honey += ((bees * honeyBee) / 4);
    if (honey > honeyLimit){
        honey = honeyLimit;
    }
}
function generateBees(){
    bees += beesSecond;
    if (bees > beeLimit){
        bees = beeLimit;
    }
}

// START: UNIT PURCHASE FUNCTIONS

document.querySelector(`#beeboxUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.beeboxPrice){
        units.beebox++;
        honey -= units.beeboxPrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#interviewerUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.interviewerPrice){
        units.interviewer++;
        honey -= units.interviewerPrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#flowergardenUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.flowergardenPrice){
        units.flowergarden++;
        honey -= units.flowergardenPrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#honeycrateUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.honeycratePrice){
        units.honeycrate++;
        honey -= units.honeycratePrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#queenbeeUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.queenbeePrice){
        units.queenbee++;
        honey -= units.queenbeePrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#smokerUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.smokerPrice){
        units.smoker++;
        honey -= units.smokerPrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#smallhiveUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.smallhivePrice){
        units.smallhive++;
        honey -= units.smallhivePrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#honeyfridgeUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.honeyfridgePrice){
        units.honeyfridge++;
        honey -= units.honeyfridgePrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#bighiveUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.bighivePrice){
        units.bighive++;
        honey -= units.bighivePrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#noneuclideanhoneycellarUnitPurchase`).addEventListener("click", () => {
    if (honey >= units.noneuclideanhoneycellarPrice){
        units.noneuclideanhoneycellar++;
        honey -= units.noneuclideanhoneycellarPrice;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

// END: UNIT PURCHASE FUNCTIONS

function saveGame(){
    localStorage.setItem(`bees`, bees);
    localStorage.setItem(`honey`, honey);

    localStorage.setItem(`beeboxUnit`, units.beebox);
    localStorage.setItem(`interviewerUnit`, units.interviewer);
    localStorage.setItem(`flowergardenUnit`, units.flowergarden);
    localStorage.setItem(`honeycrateUnit`, units.honeycrate);
    localStorage.setItem(`queenbeeUnit`, units.queenbee);
    localStorage.setItem(`smokerUnit`, units.smoker);
    localStorage.setItem(`smallhiveUnit`, units.smallhive);
    localStorage.setItem(`honeyfridgeUnit`, units.honeyfridge);
    localStorage.setItem(`bighiveUnit`, units.bighive);
    localStorage.setItem(`noneuclideanhoneycellarUnit`, units.noneuclideanhoneycellar);

    localStorage.setItem(`firstAchievement`, achievements.firstAchievement);
    localStorage.setItem(`secondAchievement`, achievements.secondAchievement);
    localStorage.setItem(`thirdAchievement`, achievements.thirdAchievement);
    localStorage.setItem(`fourthAchievement`, achievements.fourthAchievement);
    localStorage.setItem(`fifthAchievement`, achievements.fifthAchievement);

    document.querySelector(`#saveState`).textContent = `game saved!`;
    setTimeout(() => {
        document.querySelector(`#saveState`).textContent = `game saves on close/refresh`;
    }, 2000);
}

document.querySelector(`#beesButton`).addEventListener("click", () => {
    bees += beesClick;
    if (bees > beeLimit){
        bees = beeLimit;
    }
    checkImpact();
    refreshNumbers();
});
document.querySelector(`#saveButton`).addEventListener("click", saveGame);

document.querySelector(`#clearButton`).addEventListener("click", () => {
    let confirmed = confirm(`are you sure you want to wipe all progress? this cannot be undone.`)
    if (!confirmed) return;
    let confirmedSecond = confirm(`are you ABSOLUTELY sure? this CANNOT be undone.`)
    if (!confirmedSecond) return;
    bees = beesBase;
    honey = honeyBase;

    units.beebox = 0;
    units.interviewer = 0;
    units.flowergarden = 0;
    units.honeycrate = 0;
    units.queenbee = 0;
    units.smoker = 0;
    units.smallhive = 0;
    units.honeyfridge = 0;
    units.bighive = 0;
    units.noneuclideanhoneycellar = 0;

    achievements.firstAchievement = false;
    document.querySelector(`#firstAchievement`).classList.remove(`achieved`);
    achievements.secondAchievement = false;
    document.querySelector(`#secondAchievement`).classList.remove(`achieved`);
    achievements.thirdAchievement = false;
    document.querySelector(`#thirdAchievement`).classList.remove(`achieved`);
    achievements.fourthAchievement = false;
    document.querySelector(`#fourthAchievement`).classList.remove(`achieved`);
    achievements.fifthAchievement = false;
    document.querySelector(`#fifthAchievement`).classList.remove(`achieved`);

    checkImpact();
    refreshNumbers();
    saveGame();
});

setInterval(() => {
    generateHoney();
    checkImpact();
    refreshNumbers();
}, 250);
setInterval(() => {
    generateBees();
}, 1000);

window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = ``;
    saveGame();
});