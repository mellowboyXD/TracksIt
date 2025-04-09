import { chart } from "./dashboardChart.js";
import { getAllFromDB, getRangeFromDB } from "./db.js";
import { getBudget } from "./settings.js";

export async function fetchData() {
    try {
        // const data = await getAllFromDB();
        const data = await getRangeFromDB();
        const budget = getBudget();
        const budgetEl = document.getElementById('budget');    
        budgetEl.innerText = `$${budget}`;
        return data;
    } catch(err) {
        console.error("Could not refresh chart: ", err);
        return null;
    }
}

export async function refreshChart() {
    window.location.reload();
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetchData();
});