const form = document.querySelector('form');
const div = document.querySelector('div.form-group');
const dialog = document.querySelector("dialog");
const fermerModal = document.querySelector('button.close');
const inputNom = document.getElementById('nomTache');
const ajoutTag = document.getElementById('addTag');
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
                setTitreModal(`Erreur ${r.status}`);
                setTexteModal(`Message d'erreur : ${r.statusText}`);
                dialog.showModal();
                throw new Error(`Erreur ${r.status} lors de la création de la tache.\nMessage d'erreur : ${r.statusText}`);
            }
        });
    } catch (error) {
        console.error(error.message);
    }
});

fermerModal.addEventListener('click', function() {
    dialog.close()
})

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
        setTitreModal('Erreur');
        setTexteModal('Vous devez renseigner un nom de tâche.');
        dialog.showModal();
        throw new Error(`Le nom de la tâche n'a pas été renseigné.`);
    } else if (tagVide && !nomVide) {
        document.querySelectorAll('input#tag').forEach(input => input.classList.add('error'));
        setTitreModal('Erreur');
        setTexteModal('Vous devez renseigner au moins un tag pour la tache.');
        dialog.showModal();
        throw new Error(`Il faut renseigner au moins un tag.`);
    } else if (nomVide && tagVide) {
        document.getElementById('nomTache').classList.add('error');
        document.querySelectorAll('input#tag').forEach(input => input.classList.add('error'));
        setTitreModal('Erreur');
        setTexteModal('Vous devez renseigner un nom de tâche.<br/>Vous devez renseigner au moins un tag pour la tache.');
        dialog.showModal();
        throw new Error(`Le nom de la tâche est vide.\nLes tags sont vides.`);
    }
}