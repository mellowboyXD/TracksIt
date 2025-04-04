import { getAllFromDB, insertIntoDB } from "./db.js";


const addFormEl = document.getElementById('addForm');

const descriptionEl = document.getElementById('description');
const categoryEl = document.getElementById('category');
const dateFieldEl = document.getElementById('date');
const amountEl = document.getElementById('amount');


addFormEl.onsubmit = async function(e) {
    e.preventDefault();
    const description = descriptionEl.value;
    const category = categoryEl.value;
    const dateField = dateFieldEl.value;
    const amount = amountEl.value;
    
    // Data Validation
    if (!validateFormData(description, category, dateField, amount)) {
        alert('All fields must be filled. Input correct data')
    } else {
        const res = await addEntry(description, category, dateField, amount);
        if (res) {
            alert('New entry created!');
            clearForm();
            window.location.reload();
        } else {
            alert('Problem adding data');
        }
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
    if (desc.length === 0 || dateField.length === 0 || cat === 'category') {
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
    descriptionEl.value = '';
    amountEl.value = '';
    categoryEl.value = 'category';
    dateFieldEl.value = '';
}

async function addEntry(desc, cat, dateField, amount) {
    try {
        const result = await insertIntoDB({
            description: desc,
            category: cat,
            date: dateField,
            amount: amount
        });
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Could not add data to the database.", err);
        return false;
    }
}

async function displayRows() {
    const tableBody = document.querySelector('tbody');
    try {
        const res = await getAllFromDB();
        let count = 0;
        res.forEach(row => {
            // display
            const data = `
                <tr data-bs-toggle="modal" data-bs-target="#editModal" class="row-data">
                    <th scope="row">${++count}</th>
                    <td class="hidden-cell">${row.id}</td>
                    <td>${row.description}</td>
                    <td>${row.category}</td>
                    <td>${row.date}</td>
                    <td>${row.amount}</td>
                </tr>
            `;
            tableBody.innerHTML += data;
        });
    } catch(err) {
        console.error("Error getting data. ", err);
        return false;
    }
}

displayRows();