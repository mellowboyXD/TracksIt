export async function checkSwRegistration() {
  let swLocation = "sw.js";
  if (
    window.location.href.includes("settings") ||
    window.location.href.includes("table")
  ) {
    swLocation = "../sw.js";
  }
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(swLocation);
      console.log("Service worker registered");
    } catch (err) {
      console.error("Error registering service worker: ", err);
    }
  } else {
    console.log("Service Worker API not available");
  }
}

export async function unregisterSw() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();

      if (registration) {
        const result = registration.unregister();
        if (result) {
          console.log("Service worker unregistered");
        } else {
          console.error("Service worker could not be unregistered");
        }
      } else {
        console.error("Could not get service worker registration: ");
      }
    } catch (err) {
      console.error("Failed to unregister service worker: ", err);
    }
  } else {
    console.log("Service Worker API not available");
  }
}

function imagePing(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true); // Got a valid response
    img.onerror = () => resolve(false); // Failed to load
    img.src = `${url}?_=${Date.now()}`; // prevent caching
  });
}

async function isOnline() {
  try {
    // const response = await fetch("/ping.txt", {
    //   cache: "no-store",
    //   method: "HEAD",
    // });
    const response = await imagePing("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png");

    return response;
  } catch (e) {
    return false;
  }
}

export async function updateOnlineStatus() {
  const offline = '<i class="fa-solid fa-link-slash text-danger"></i>';
  const online = '<i class="fa-solid fa-link text-success"></i>';
  const netStat = document.getElementById("net-status");

  const ping = await isOnline();
  if (ping) {
    netStat.innerHTML = online;
    await unregisterSw();
    await checkSwRegistration();
  } else {
    netStat.innerHTML = offline;
  }
}
