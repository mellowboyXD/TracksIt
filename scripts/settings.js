import { ERROR, isOnline, showAlert, unregisterSw, updateOnlineStatus } from "./core.js";

const sliderEl = document.getElementById("budget-slider");
const budgetAmountEl = document.getElementById("budget-amount");
const form = document.querySelector("form");
const radios = document.querySelectorAll("input[name='chartType-radio']");
const dashboardLegend = document.getElementById("show-legend-input");
const dashboardLegendText = document.getElementById("show-legend-setting-text");
const saveBtn = document.getElementById("save-settings");

const DEFAULT_BUDGET = "250";
const BUDGET_ENTRY = "budget";
const DEFAULT_CHARTTYPE = "pie";
const CHARTTYPE_ENTRY = "chartType";
const DEFAULT_SHOW_LEGEND = false;
const SHOW_LEGEND_ENTRY = "showLegend";

let budget = getBudget();
let chartType = getChartType();
let showLegend = getShowLegend();

form.onsubmit = function (event) {
    event.preventDefault();
}

window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.href.includes("settings")) {
    await updateOnlineStatus();
    await setAppVersion();
    setBudgetAmount();
    setRadio();
    setShowLegendSwitch();
    setShowLegendText();

    dashboardLegend.onchange = function () {
        setShowLegendText();
    }

    const clearCacheBtn = document.getElementById("clear-cache-btn");
    clearCacheBtn.addEventListener("click", async () => {
        await unregisterSw();
        await clearCache();
        // window.location.reload();
    })

    // Save settings
    saveBtn.addEventListener("click", async () => {
        window.localStorage.setItem(BUDGET_ENTRY, getSelectedBudget());
        window.localStorage.setItem(CHARTTYPE_ENTRY, getSelectedChartType());
        window.localStorage.setItem(SHOW_LEGEND_ENTRY, getSelectedShowLegend());
        
        await showAlert("Settings were saved");
        window.location.reload();
    })
  }
});

function setShowLegendSwitch() {
    dashboardLegend.checked = getShowLegend();
}

function setShowLegendText() {  
    if(!dashboardLegend.checked) {
        dashboardLegendText.innerText = "Legend will not be displayed on the dashboard";
    } else {
        dashboardLegendText.innerText = "Legend will be displayed on the dashboard";
    }
}

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

function getSelectedBudget() {
    return sliderEl.value;
}

function getSelectedShowLegend() {
    return dashboardLegend.checked;
}

function getSelectedChartType() {
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            return radios[i].value;
        }
    }
}

export function getShowLegend() {
    let showLegend = window.localStorage.getItem(SHOW_LEGEND_ENTRY);
    if(!showLegend) {
        window.localStorage.setItem(SHOW_LEGEND_ENTRY, DEFAULT_SHOW_LEGEND);
        showLegend = window.localStorage.getItem(SHOW_LEGEND_ENTRY);
    }

    if(showLegend === "false") {
        return false;
    } else {
        return true;
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

async function clearCache() {
    const ping = await isOnline();    
    if(ping) {
        caches.keys().then(cacheNames => {            
            if(cacheNames.length <= 0) {
                showAlert("Cache empty. Nothing to clear", ERROR);
            } else {
                cacheNames.forEach(cacheName => {
                    caches.delete(cacheName);
                });
                showAlert("Cache has been cleared");
            }
        });
    } else {
        showAlert("You are offline", ERROR);
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