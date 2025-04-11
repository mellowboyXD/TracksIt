import { getRangeFromDB } from "./db.js";
import { getBudget } from "./settings.js";
import { updateOnlineStatus, checkSwRegistration } from "./core.js";

export async function fetchData() {
  try {
    const data = await getRangeFromDB();
    const budget = getBudget();
    const budgetEl = document.getElementById("budget");
    budgetEl.innerText = `$${budget}`;
    return data;
  } catch (err) {
    console.error("Could not refresh chart: ", err);
    return null;
  }
}

export async function refreshChart() {
  window.location.reload();
}

window.addEventListener("DOMContentLoaded", async () => {
  await checkSwRegistration();
  await fetchData();
  await updateOnlineStatus();
});