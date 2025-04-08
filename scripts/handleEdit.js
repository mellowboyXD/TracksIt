import { deleteRecordFromDB, getAllFromDB, updateFromDB } from "./db.js";
import { refreshTable } from "./table.js";

const editFormEl = document.getElementById('editForm');

const idEditEl = document.getElementById('modal-id');
const descriptionEditEl = document.getElementById('descriptionEdit');
const categoryEditEl = document.getElementById('categoryEdit');
const dateEditEl = document.getElementById('dateEdit');
const amountEditEl = document.getElementById('amountEdit');

const deleteButton = document.getElementById('deleteEntry');
const saveEditButton = document.getElementById('saveEdit');

window.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    table.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        if (row && table.contains(row)) {
            const data = Array.from(row.cells);
            idEditEl.innerText = data[1].innerText;
            descriptionEditEl.value = data[2].innerText;
            categoryEditEl.value = data[3].innerText;
            dateEditEl.value = data[4].innerText;
            amountEditEl.value = data[5].innerText;
        }
    });
});

editFormEl.onsubmit = function (e) {
    e.preventDefault();
}

deleteButton.addEventListener('click', async () => {
    const id = idEditEl.innerText;
    try {
        await deleteRecordFromDB(id);
        console.log("Successfully deleted entry");
        // await refreshTable();
        window.location.reload();
    } catch(err) {
        console.error(err);
    }
});

saveEditButton.addEventListener('click', async () => {
    const id = idEditEl.innerText;
    const description = descriptionEditEl.value;
    const category = categoryEditEl.value;
    const date = dateEditEl.value;
    const amount = amountEditEl.value;

    try {
        const res = await updateFromDB({
            id,
            description,
            category,
            date,
            amount
        });

        console.log("Successfully Updated Entry");
        // await refreshTable();
        window.location.reload();
    } catch(err) {
        console.error("Could not update entry", err);
    }
    
});