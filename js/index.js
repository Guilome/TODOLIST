const form = document.querySelector('form');
const dialog = document.querySelector("dialog");
const fermerModal = document.querySelector('button.close');
const inputPrenom = document.getElementById('prenom')

form.addEventListener('submit', (e) => {
    try {
        e.preventDefault();
        submitPrenom();
    } catch (error) {
        console.error(error.message);
    }
});

fermerModal.addEventListener('click', function() {
    dialog.close()
});

inputPrenom.addEventListener('focusin', (e) => {
    inputPrenom.classList.remove('error');
});

function submitPrenom() {
    if (inputPrenom.value === "" || inputPrenom.value === null) {
        inputPrenom.classList.add('error');
        setTitreModal('Erreur');
        setTexteModal('Vous devez d\'abord renseigner un prénom avant d\'accéder à la liste des tâches.');
        dialog.showModal();
        throw new Error(`Le prénom est vide.`)
    } else {
        localStorage.setItem('prenom_todo', JSON.stringify(inputPrenom.value));
        navigation('tasks.html');
    }
}
