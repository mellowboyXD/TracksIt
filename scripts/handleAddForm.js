import { insertIntoDB } from "./db.js";
import { fetchData, refreshChart } from "./index.js";
import { refreshTable as refreshTable } from "./table.js";

const SUCCESS = "success";
const ERROR = "error";
const WARNING = "warning";

const addFormEl = document.getElementById("addForm");

const descriptionEl = document.getElementById("description");
const categoryEl = document.getElementById("category");
const dateFieldEl = document.getElementById("date");
const amountEl = document.getElementById("amount");

addFormEl.onsubmit = async function (e) {
  e.preventDefault();
  const description = descriptionEl.value;
  const category = categoryEl.value;
  const dateField = dateFieldEl.value;
  const amount = amountEl.value;

  // Data Validation
  if (!validateFormData(description, category, dateField, amount)) {
    await showAlert("All fields must be filled. Input correct data", WARNING);
  } else {
    const res = await addEntry(description, category, dateField, amount);
    if (res) {
      await showAlert("New entry created!");
      clearForm();
      await refreshPage();
    } else {
      await showAlert("Problem adding data", ERROR);
    }
  }
};

async function refreshPage() {
  if(window.location.href.includes('table')){
    await refreshTable();
  } else {
    await refreshChart();
  }
}

/**
 * Validates the form input fields
 * returns true is all valid else false
 *
 * @param {String} desc - description
 * @param {String} cat - category
 * @param {String} dateField - date
 * @param {String} amount - gets converted to a float
 * @returns Either true or false
 */
function validateFormData(desc, cat, dateField, amount) {
  amount = parseFloat(amount);
  if (desc.length === 0 || dateField.length === 0 || cat === "category") {
    return false;
  } else if (amount.length === 0 || isNaN(amount)) {
    return false;
  }

  return true;
}

/**
 * Clears the form input values
 */
function clearForm() {
  descriptionEl.value = "";
  amountEl.value = "";
  categoryEl.value = "category";
  dateFieldEl.value = "";
}

async function addEntry(desc, cat, dateField, amount) {
  try {
    await insertIntoDB({
      description: desc,
      category: cat,
      date: dateField,
      amount: amount,
    });
    return true;
  } catch (err) {
    await showAlert("Entry could not be added to the database", ERROR);
    console.error("Could not add data to the database.", err);
    return false;
  }
}

function showAlert(message, type=SUCCESS) {
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
  modal.setAttribute("aria-hidden", "true");
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
