export const SUCCESS = "success";
export const ERROR = "error";
export const WARNING = "warning";

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
      let registration = await navigator.serviceWorker.getRegistration(swLocation);
      if(!registration) {
        registration = await navigator.serviceWorker.register(swLocation);
        console.log("Service worker registered");
      }
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
  const pingImage = new Promise((resolve) => {
    const img = new Image();
    img.src = `${url}?_=${Date.now()}`;
    img.onload = () => resolve(true); 
    img.onerror = () => resolve(false);
  });

  const timeout = new Promise((resolve) => {
    setTimeout(() => resolve(false), 700);
  });

  return Promise.race([pingImage, timeout]);

}

export async function isOnline() {
  try {
    const target = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";
    const response = imagePing(target); 
    
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
    await checkSwRegistration();
  } else {
    netStat.innerHTML = offline;
  }
}

export function showAlert(message, type=SUCCESS) {
  let buttonColor = "btn-success";
  let modalTitle = '<i class="fa-regular fa-bell"></i> SUCCESS'
  let borderColor = "border-success";
  if(type === ERROR) {
    buttonColor = "btn-danger"
    modalTitle = '<i class="fa-solid fa-radiation"></i>  ERROR'
    borderColor = "border-danger"
  } else if (type === WARNING) {
    buttonColor = "btn-warning";
    modalTitle = '<i class="fa-solid fa-triangle-exclamation"></i> WARNING'
    borderColor = "border-warning";
  }
  const mainEl = document.querySelector("main");
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.tabIndex = -1;
  modal.setAttribute("data-bs-backdrop", "static");
  modal.setAttribute("data-bs-keyboard", "false");
  modal.id = "alert-modal";
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content border ${borderColor} bg-dark text-light">
        <div class="modal-header border-bottom ${borderColor} w-100">
          <h5 class="modal-title text-center w-100">${modalTitle}</h5>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="text-center pb-3 ps-3 pe-3 w-100">
          <button id="ok-btn" type="button" class="btn ${buttonColor} w-100" data-bs-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  `;

  return new Promise((resolve) => {
    mainEl.appendChild(modal);

    const myModal = new bootstrap.Modal(modal);
    myModal.show();  
  
    modal.addEventListener('hidden.bs.modal', () => {
      mainEl.removeChild(modal);
    })

    modal.querySelector("#ok-btn").addEventListener('click', () => {
      resolve();
    });
  });
}
