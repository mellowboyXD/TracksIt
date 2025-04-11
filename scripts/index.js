import { getRangeFromDB } from "./db.js";
import { getBudget } from "./settings.js";

export async function fetchData() {
    try {
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

async function checkSwRegistration() {
    let swLocation = "sw.js";
    if(window.location.href.includes("settings") || window.location.href.includes("table")) {
        swLocation = "../sw.js"
    }
    if("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(swLocation);
            console.log("Service worker registered");   
        } catch(err) {
            console.error("Error registering service worker: ", err);
        }
    } else {
        console.log("Service Worker API not available");
    }
}

async function unregisterSw() {
    if("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            
            if(registration) {
                const result = registration.unregister();
                if(result) {
                    console.log("Service worker unregistered");
                } else {
                    console.error("Service worker could not be unregistered");
                }
            } else {
                console.error("Could not get service worker registration: ");
            }
        } catch(err) {
            console.error("Failed to unregister service worker: ", err);
        }
    } else {
        console.log("Service Worker API not available");
    }
}

function updateOnlineStatus() {
    console.log(navigator.onLine ? "online" : "offline");
    
}

window.addEventListener('DOMContentLoaded', async () => {
    await checkSwRegistration();
    // await unregisterSw();
    updateOnlineStatus();
    await fetchData();
});