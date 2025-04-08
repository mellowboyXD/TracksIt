import { chart } from "./dashboardChart.js";
import { getAllFromDB, getRangeFromDB } from "./db.js";

export async function fetchData() {
    try {
        // const data = await getAllFromDB();
        const data = await getRangeFromDB();
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