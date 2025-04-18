const url_API = "http://localhost:3000/todos";
const ajoutTag = document.getElementById('addTag');
const form = document.querySelector('form');
const div = document.querySelector('div.form-group');
const dialogAll = document.getElementById("dialogAll");
const dialogNom = document.getElementById("dialogNom");
const dialogTag = document.getElementById("dialogTag");
const fermerModalNom = document.getElementById('nomClose');
const fermerModalTag = document.getElementById('tagClose');
const fermerModalAll = document.getElementById('allClose');
const inputNom = document.getElementById('nomTache');
let inputTag =  document.querySelectorAll('input#tag');

ajoutTag.addEventListener('click', (e) => {
    let newInput = document.getElementById("tag").cloneNode(true);
    div.appendChild(newInput);
    inputTag =  document.querySelectorAll('input#tag');
});

form.addEventListener('submit', (e) => {
    try {
        e.preventDefault();
        // Comme il y a la possibilité de renseigné plusieurs tag on recupere la valeur de chacun des inputs dans un tableau.
        let tags = [];
        inputTag.forEach((input) => {
            if (input.value !== "" && input.value != null) {
                tags.push(input.value);
            }
        });
        verifForm(tags);
        // Objet tache qui va etre créer
        const tache = {
            text: inputNom.value,
            Tags: tags
        };
        console.info(tache);

        fetch(url_API, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tache)
        }).then(r => {
            if (r.ok) {
                window.opener.location.reload();
                window.close();
            } else {
                throw new Error(`Erreur ${r.status} lors de la création de la tache.\nMessage d'erreur : ${r.statusText}`);
            }
        }).catch(
            err => {
                console.error(err.message);
            }
        )

    } catch (error) {
        console.error(error.message);
    }
});

fermerModalNom.addEventListener('click', function() {
    dialogNom.close()
});

fermerModalTag.addEventListener('click', function() {
    dialogTag.close()
});

fermerModalAll.addEventListener('click', function() {
    dialogAll.close()
});

div.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('error')) {
        e.target.classList.remove('error');
    }
});

function verifForm(tags) {
    const nomVide = (inputNom.value === "" || inputNom.value === null)
    let tagVide = false;
    if (tags && tags.length > 0) {
        tags.forEach(value => {
            tagVide = value === "" || value === null;
        });
    } else {
        tagVide = true;
    }
    if (nomVide && !tagVide) {
        document.getElementById('nomTache').classList.add('error');
        dialogNom.showModal();
        throw new Error(`Le nom de la tâche n'a pas été renseigné.`);
    } else if (tagVide && !nomVide) {
        document.querySelectorAll('input#tag').forEach(input => input.classList.add('error'));
        dialogTag.showModal();
        throw new Error(`Il faut renseigner au moins un tag.`);
    } else if (nomVide && tagVide) {
        document.getElementById('nomTache').classList.add('error');
        document.querySelectorAll('input#tag').forEach(input => input.classList.add('error'));
        dialogAll.showModal();
        throw new Error(`Le nom de la tâche est vide.\nles tags sont vides.`);
    }
}