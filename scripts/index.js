import { getAllFromDB } from "./db.js";

export async function fetchData() {
    try {
        const data = await getAllFromDB();
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