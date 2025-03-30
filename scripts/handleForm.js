const addFormEl = document.getElementById('addForm');
const descriptionEl = document.getElementById('description');
const categoryEl = document.getElementById('category');
const dateFieldEl = document.getElementById('date');
const amountEl = document.getElementById('amount');


addFormEl.onsubmit = function(e) {
    e.preventDefault();
    const description = descriptionEl.value;
    const category = categoryEl.value;
    const dateField = dateFieldEl.value;
    const amount = amountEl.value;
    
    // Data Validation
    if (!validateFormData(description, category, dateField, amount)) {
        alert("All fields must be filled. Input correct data")
    } else {
        clearForm();
    }
}

/**
 * Validates the form input fields
 * returns true is all valid else false
 * 
 * @param {String} desc - description
 * @param {String} cat - category
 * @param {String} dateField - date
 * @param {String} amount
 * @returns {Boolean} Either true or false
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