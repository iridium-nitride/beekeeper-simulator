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

//UNITS

const beebox = {
    number: parseInt(localStorage.getItem(`beeboxUnit`)) || 0,
    priceBase: 500,
    price: 0,
}
const interviewer = {
    number: parseInt(localStorage.getItem(`interviewerUnit`)) || 0,
    priceBase: 800,
    price: 0,
}
const flowergarden = {
    number: parseInt(localStorage.getItem(`flowergardenUnit`)) || 0,
    priceBase: 1200,
    price: 0,
}
const honeycrate = {
    number: parseInt(localStorage.getItem(`honeycrateUnit`)) || 0,
    priceBase: 1800,
    price: 0,
}
const queenbee = {
    number: parseInt(localStorage.getItem(`queenbeeUnit`)) || 0,
    priceBase: 3000,
    price: 0,
}
const smoker = {
    number: parseInt(localStorage.getItem(`smokerUnit`)) || 0,
    priceBase: 6000,
    price: 0,
}
const smallhive = {
    number: parseInt(localStorage.getItem(`smallhiveUnit`)) || 0,
    priceBase: 12000,
    price: 0,
}
const honeyfridge = {
    number: parseInt(localStorage.getItem(`honeyfridgeUnit`)) || 0,
    priceBase: 18000,
    price: 0,
}
const bighive = {
    number: parseInt(localStorage.getItem(`bighiveUnit`)) || 0,
    priceBase: 32000,
    price: 0,
}
const noneuclideanhoneycellar = {
    number: parseInt(localStorage.getItem(`noneuclideanhoneycellarUnit`)) || 0,
    priceBase: 50000,
    price: 0,
}

const achievements = {
    firstAchievement: localStorage.getItem(`firstAchievement`) === "true",
    secondAchievement: localStorage.getItem(`secondAchievement`)  === "true",
    thirdAchievement: localStorage.getItem(`thirdAchievement`) === "true",
    fourthAchievement: localStorage.getItem(`fourthAchievement`)  === "true",
    fifthAchievement: localStorage.getItem(`fifthAchievement`)  === "true",
    sixthAchievement: localStorage.getItem(`sixthAchievement`) === "true",
}

checkImpact();
refreshNumbers();

function refreshNumbers(){
    document.querySelector(`#beesCounter`).textContent = bees.toLocaleString();
    document.querySelector(`#honeyCounter`).textContent = Math.floor(honey).toLocaleString();
    document.querySelector(`#beesSecondCounter`).textContent = beesSecond.toLocaleString();
    document.querySelector(`#honeyBeeCounter`).textContent = honeyBee.toLocaleString();
    document.querySelector(`#beesClickCounter`).textContent = beesClick.toLocaleString();
    document.querySelector(`#honeySecondCounter`).textContent = (honeyBee * bees).toFixed(2).toLocaleString();

    document.querySelector(`#beeLimitCounter`).textContent = Math.floor(beeLimit).toLocaleString();
    document.querySelector(`#honeyLimitCounter`).textContent = Math.floor(honeyLimit).toLocaleString();

    document.querySelector(`#beeboxUnitCounter`).textContent = beebox.number.toLocaleString();
    document.querySelector(`#interviewerUnitCounter`).textContent = interviewer.number.toLocaleString();
    document.querySelector(`#flowergardenUnitCounter`).textContent = flowergarden.number.toLocaleString();
    document.querySelector(`#honeycrateUnitCounter`).textContent = honeycrate.number.toLocaleString();
    document.querySelector(`#queenbeeUnitCounter`).textContent = queenbee.number.toLocaleString();
    document.querySelector(`#smokerUnitCounter`).textContent = smoker.number.toLocaleString();
    document.querySelector(`#smallhiveUnitCounter`).textContent = smallhive.number.toLocaleString();
    document.querySelector(`#honeyfridgeUnitCounter`).textContent = honeyfridge.number.toLocaleString();
    document.querySelector(`#bighiveUnitCounter`).textContent = bighive.number.toLocaleString();
    document.querySelector(`#noneuclideanhoneycellarUnitCounter`).textContent = noneuclideanhoneycellar.number.toLocaleString();

    document.querySelector(`#beeboxUnitPriceCounter`).textContent = beebox.price.toLocaleString();
    document.querySelector(`#interviewerUnitPriceCounter`).textContent = interviewer.price.toLocaleString();
    document.querySelector(`#flowergardenUnitPriceCounter`).textContent = flowergarden.price.toLocaleString();
    document.querySelector(`#honeycrateUnitPriceCounter`).textContent = honeycrate.price.toLocaleString();
    document.querySelector(`#queenbeeUnitPriceCounter`).textContent = queenbee.price.toLocaleString();
    document.querySelector(`#smokerUnitPriceCounter`).textContent = smoker.price.toLocaleString();
    document.querySelector(`#smallhiveUnitPriceCounter`).textContent = smallhive.price.toLocaleString();
    document.querySelector(`#honeyfridgeUnitPriceCounter`).textContent = honeyfridge.price.toLocaleString();
    document.querySelector(`#bighiveUnitPriceCounter`).textContent = bighive.price.toLocaleString();
    document.querySelector(`#noneuclideanhoneycellarUnitPriceCounter`).textContent = noneuclideanhoneycellar.price.toLocaleString();
}

function checkImpact(){
    //REMEMBER TO EDIT THESE WHEN ADDING NEW UNITS
    beesSecond = beesSecondBase + (queenbee.number * 1);
    honeyBee = honeyBeeBase + (flowergarden.number * 0.01) + (smoker.number * 0.1) + (bighive.number * 0.5);
    beesClick = beesClickBase + (interviewer.number * 1);

    beeLimit = beeLimitBase + (beebox.number * 150) + (smallhive.number * 1000) + (bighive.number * 5000);
    let baseHoneyLimit = honeyLimitBase + (honeycrate.number * 1000) + (honeyfridge.number * 12000);
    honeyLimit = baseHoneyLimit * (1.2 ** noneuclideanhoneycellar.number);

    beebox.price = Math.floor(beebox.priceBase * (priceIncrement ** beebox.number));
    interviewer.price = Math.floor(interviewer.priceBase * (priceIncrement ** interviewer.number));
    flowergarden.price = Math.floor(flowergarden.priceBase * (priceIncrement ** flowergarden.number));
    honeycrate.price = Math.floor(honeycrate.priceBase * (priceIncrement ** honeycrate.number));
    queenbee.price = Math.floor(queenbee.priceBase * (priceIncrement ** queenbee.number));
    smoker.price = Math.floor(smoker.priceBase * (priceIncrement ** smoker.number));
    smallhive.price = Math.floor(smallhive.priceBase * (priceIncrement ** smallhive.number));
    honeyfridge.price = Math.floor(honeyfridge.priceBase * (priceIncrement ** honeyfridge.number));
    bighive.price = Math.floor(bighive.priceBase * (priceIncrement ** bighive.number));
    noneuclideanhoneycellar.price = Math.floor(noneuclideanhoneycellar.priceBase * (priceIncrement ** noneuclideanhoneycellar.number));

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
        //sixth
    if (beebox.number > 0 && interviewer.number > 0 && flowergarden.number > 0 && honeycrate.number > 0 && queenbee.number > 0 && smoker.number > 0 && smallhive.number > 0 && honeyfridge.number > 0 && bighive.number > 0 && noneuclideanhoneycellar.number > 0){
        achievements.sixthAchievement = true;
        document.querySelector(`#sixthAchievement`).classList.add(`achieved`);
    }

    //UNIT HIDING THINGY

    if (honey >= (beebox.priceBase / 2)){
        document.querySelector(`#interviewerUnit`).classList.remove(`hidden`);
    };

    if (honey >= (flowergarden.priceBase / 2)){
        document.querySelector(`#flowergardenUnit`).classList.remove(`hidden`);
    };

    if (honey >= (honeycrate.priceBase / 2)){
        document.querySelector(`#honeycrateUnit`).classList.remove(`hidden`);
    };

    if (honey >= (queenbee.priceBase / 2)){
        document.querySelector(`#queenbeeUnit`).classList.remove(`hidden`);
    };

    if (honey >= (smoker.priceBase / 2)){
        document.querySelector(`#smokerUnit`).classList.remove(`hidden`);
    };
    
    if (honey >= (smallhive.priceBase / 2)){
        document.querySelector(`#smallhiveUnit`).classList.remove(`hidden`);
    };

    if (honey >= (honeyfridge.priceBase / 2)){
        document.querySelector(`#honeyfridgeUnit`).classList.remove(`hidden`);
    };

    if (honey >= (bighive.priceBase / 2)){
        document.querySelector(`#bighiveUnit`).classList.remove(`hidden`);
    };

    if (honey >= (noneuclideanhoneycellar.priceBase / 2)){
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
    if (honey >= beebox.price){
        beebox.number++;
        honey -= beebox.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#interviewerUnitPurchase`).addEventListener("click", () => {
    if (honey >= interviewer.price){
        interviewer.number++;
        honey -= interviewer.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#flowergardenUnitPurchase`).addEventListener("click", () => {
    if (honey >= flowergarden.price){
        flowergarden.number++;
        honey -= flowergarden.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#honeycrateUnitPurchase`).addEventListener("click", () => {
    if (honey >= honeycrate.price){
        honeycrate.number++;
        honey -= honeycrate.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#queenbeeUnitPurchase`).addEventListener("click", () => {
    if (honey >= queenbee.price){
        queenbee.number++;
        honey -= queenbee.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#smokerUnitPurchase`).addEventListener("click", () => {
    if (honey >= smoker.price){
        smoker.number++;
        honey -= smoker.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#smallhiveUnitPurchase`).addEventListener("click", () => {
    if (honey >= smallhive.price){
        smallhive.number++;
        honey -= smallhive.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#honeyfridgeUnitPurchase`).addEventListener("click", () => {
    if (honey >= honeyfridge.price){
        honeyfridge.number++;
        honey -= honeyfridge.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#bighiveUnitPurchase`).addEventListener("click", () => {
    if (honey >= bighive.price){
        bighive.number++;
        honey -= bighive.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

document.querySelector(`#noneuclideanhoneycellarUnitPurchase`).addEventListener("click", () => {
    if (honey >= noneuclideanhoneycellar.price){
        noneuclideanhoneycellar.number++;
        honey -= noneuclideanhoneycellar.price;
        document.dispatchEvent(unitPurchaseEvent);
        checkImpact();
        refreshNumbers();
    }
});

// END: UNIT PURCHASE FUNCTIONS

function saveGame(){
    localStorage.setItem(`bees`, bees);
    localStorage.setItem(`honey`, honey);

    localStorage.setItem(`beeboxUnit`, beebox.number);
    localStorage.setItem(`interviewerUnit`, interviewer.number);
    localStorage.setItem(`flowergardenUnit`, flowergarden.number);
    localStorage.setItem(`honeycrateUnit`, honeycrate.number);
    localStorage.setItem(`queenbeeUnit`, queenbee.number);
    localStorage.setItem(`smokerUnit`, smoker.number);
    localStorage.setItem(`smallhiveUnit`, smallhive.number);
    localStorage.setItem(`honeyfridgeUnit`, honeyfridge.number);
    localStorage.setItem(`bighiveUnit`, bighive.number);
    localStorage.setItem(`noneuclideanhoneycellarUnit`, noneuclideanhoneycellar.number);

    localStorage.setItem(`firstAchievement`, achievements.firstAchievement);
    localStorage.setItem(`secondAchievement`, achievements.secondAchievement);
    localStorage.setItem(`thirdAchievement`, achievements.thirdAchievement);
    localStorage.setItem(`fourthAchievement`, achievements.fourthAchievement);
    localStorage.setItem(`fifthAchievement`, achievements.fifthAchievement);
    localStorage.setItem(`sixthAchievement`, achievements.sixthAchievement);

    document.querySelector(`#saveState`).textContent = `game saved!`;
    setTimeout(() => {
        document.querySelector(`#saveState`).textContent = ``;
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

    beebox.number = 0;
    interviewer.number = 0;
    flowergarden.number = 0;
    honeycrate.number = 0;
    queenbee.number = 0;
    smoker.number = 0;
    smallhive.number = 0;
    honeyfridge.number = 0;
    bighive.number = 0;
    noneuclideanhoneycellar.number = 0;

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
    achievements.sixthAchievement = false;
    document.querySelector(`#sixthAchievement`).classList.remove(`achieved`);

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
});