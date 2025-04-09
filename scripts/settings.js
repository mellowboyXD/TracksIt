const sliderEl = document.getElementById("budget-slider");
const budgetAmountEl = document.getElementById("budget-amount");
const saveBtn = document.getElementById("save-settings");

const DEFAULT_BUDGET = "250";
const BUDGET_ENTRY = "budget";
let budget = getBudget();

window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.href.includes("settings")) {
    budgetAmountEl.innerText = `$${budget}`;
    sliderEl.value = budget;
    
    const tagNameEl = document.getElementById('tag-name');
    tagNameEl.innerText = await getLatestRelease();

    saveBtn.addEventListener("click", () => {
        window.localStorage.setItem(BUDGET_ENTRY, sliderEl.value);
        window.location.reload();
    })
  }
});

export function getBudget() {
    let budgetAmount = window.localStorage.getItem(BUDGET_ENTRY);
    if(!budgetAmount) {
        window.localStorage.setItem(BUDGET_ENTRY, DEFAULT_BUDGET);
        return window.localStorage.getItem(BUDGET_ENTRY);;
    } else {
        return budgetAmount;
    }
}

export async function getLatestRelease() {
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