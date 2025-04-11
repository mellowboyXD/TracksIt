import { insertIntoDB } from "./db.js";
import { refreshChart } from "./index.js";
import { refreshTable as refreshTable } from "./table.js";
import { showAlert, ERROR, WARNING } from "./core.js";

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
