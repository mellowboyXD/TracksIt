const editFormEl = document.getElementById('editForm');
const tableRows = document.querySelectorAll('#expenses-table tbody tr');

const descriptionEditEl = document.getElementById('descriptionEdit');
const categoryEditEl = document.getElementById('categoryEdit');
const dateEditEl = document.getElementById('dateEdit');
const amountEditEl = document.getElementById('amountEdit');

const deleteButton = document.getElementById('deleteEntry');
const saveEditButton = document.getElementById('saveEdit');

editFormEl.onsubmit = function (e) {
    e.preventDefault();
}

tableRows.forEach(row => {
    row.addEventListener('click', () => {
        const rowData = Array.from(row.cells).map(cell => cell.textContent);
        const id = rowData[1];
        descriptionEditEl.value = rowData[2];
        categoryEditEl.value = rowData[3];
        dateEditEl.value = rowData[4];
        amountEditEl.value = rowData[5];
        console.log(id);
    })
})

deleteButton.addEventListener('click', () => {
    // Delete from database
})

saveEditButton.addEventListener('click', () => {
    // Update database
})