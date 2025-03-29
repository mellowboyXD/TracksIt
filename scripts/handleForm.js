const addForm = document.getElementById('addForm');

addForm.onsubmit = function(e) {
    e.preventDefault();
    const description = document.getElementById('description');
    const category = document.getElementById('category');
    const dateField = document.getElementById('date');
    const amount = document.getElementById('amount');
    
    console.log(dateField.value);
}