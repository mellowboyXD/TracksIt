const editFormEl = document.getElementById('editForm');
const tableRows = document.querySelectorAll('#expenses-table tbody tr');

const descriptionEditEl = document.getElementById('descriptionEdit');
const categoryEditEl = document.getElementById('categoryEdit');
const dateEditEl = document.getElementById('dateEdit');
const amountEditEl = document.getElementById('amountEdit');

editFormEl.onsubmit = function (e) {
    e.preventDefault();
}

tableRows.forEach(row => {
    row.addEventListener("click", (e) => {
        const rowData = Array.from(row.cells).map(cell => cell.textContent);
        descriptionEditEl.value = rowData[1];
        categoryEditEl.value = rowData[2];
        dateEditEl.value = rowData[3];
        amountEditEl.value = rowData[4];
    })
})