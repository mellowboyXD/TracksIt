const addForm = document.getElementById('addForm');

addForm.onsubmit = function(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const dateField = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    
    console.log(dateField);
}