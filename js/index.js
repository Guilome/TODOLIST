const form = document.querySelector('form');
const dialog = document.querySelector("dialog");
const fermerModal = document.querySelector('button.close');
const inputPrenom = document.getElementById('prenom');

form.addEventListener('submit', (e) => {
    try {
        e.preventDefault();
        verifierPrenom(inputPrenom.value);
        localStorage.setItem('prenom_todo', JSON.stringify(prenom.value));
        navigation('tasks.html')
    } catch (error) {
        inputPrenom.classList.add('error');
        console.error(error.message);
        dialog.showModal();
    }
})

fermerModal.addEventListener('click', function() {
    dialog.close()
})

inputPrenom.addEventListener('focusin', (e) => {
    inputPrenom.classList.remove('error');
})

function verifierPrenom(prenom) {
    if (prenom === "" || prenom === null) {
        throw new Error(`Le prénom est vide.`)
    }
}