const sliderEl = document.getElementById("budget-slider");
const budgetAmountEl = document.getElementById("budget-amount");
const saveBtn = document.getElementById("save-settings");

const DEFAULT_BUDGET = "250";
const BUDGET_ENTRY = "budget";
let budget = getBudget();

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("settings")) {
    budgetAmountEl.innerText = `$${budget}`;
    sliderEl.value = budget;

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
