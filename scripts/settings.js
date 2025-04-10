const sliderEl = document.getElementById("budget-slider");
const budgetAmountEl = document.getElementById("budget-amount");
const form = document.querySelector("form");
const radios = document.querySelectorAll("input[name='chartType-radio']");
const saveBtn = document.getElementById("save-settings");

const DEFAULT_BUDGET = "250";
const BUDGET_ENTRY = "budget";
const DEFAULT_CHARTTYPE = "pie";
const CHARTTYPE_ENTRY = "chartType";

let budget = getBudget();
let chartType = getChartType();

form.onsubmit = function (event) {
    event.preventDefault();
}

window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.href.includes("settings")) {
    await setAppVersion();
    setBudgetAmount();
    setRadio();

    // Save settings
    saveBtn.addEventListener("click", () => {
        window.localStorage.setItem(BUDGET_ENTRY, sliderEl.value);
        window.localStorage.setItem(CHARTTYPE_ENTRY, getSelectedChartType());
        
        window.location.reload();
    })
  }
});

function setBudgetAmount() {
    budgetAmountEl.innerText = `$${budget}`;
    sliderEl.value = budget;
}

async function setAppVersion() {
    const tagNameEl = document.getElementById('tag-name');
    tagNameEl.innerText = await getVersionNumber();
}

function setRadio() {
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].value === chartType) {
            radios[i].checked = true;
        }
    }
}

function getSelectedChartType() {
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            return radios[i].value;
        }
    }
}

export function getChartType() {
    let chartType = window.localStorage.getItem(CHARTTYPE_ENTRY);
    if(!chartType) {
        window.localStorage.setItem(CHARTTYPE_ENTRY, DEFAULT_CHARTTYPE);
        return window.localStorage.getItem(CHARTTYPE_ENTRY);
    } else {
        return chartType;
    }
}

export function getBudget() {
    let budgetAmount = window.localStorage.getItem(BUDGET_ENTRY);
    if(!budgetAmount) {
        window.localStorage.setItem(BUDGET_ENTRY, DEFAULT_BUDGET);
        return window.localStorage.getItem(BUDGET_ENTRY);;
    } else {
        return budgetAmount;
    }
}

export async function getVersionNumber() {
    const url = "https://api.github.com/repos/mellowboyXD/TracksIt/tags";

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0].name;
    } catch(err) {
        console.error("Could not get latest release name: ", err);
    }
    return "Latest release";
}