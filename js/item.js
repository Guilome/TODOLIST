const fermer = document.getElementById('fermer');
const ouvrir = document.getElementById('ouvrir');
const supprimer = document.getElementById('supprimer');
const retourListe = document.getElementById("retourListe");
const dialog = document.querySelector("dialog");
const dialogValidation = document.querySelector("dialog#validation");
const fermerModal = document.querySelector('button.close');
const validationSuppression = document.querySelector('button.valider');
let idTache = 0;
let tache = null;

window.addEventListener("load", async function() {
    try {
        // Recuperation de la tache avec l'id passer en paremetre dans l'URL
        let param = new URLSearchParams(document.location.search);
        idTache = param.get("id");
        const response = await fetch(`${url_API}/${idTache}`);
        tache = await response.json();
        // On cache ou non le bouton pour changer le statut de la tache en ouvert ou fermer
        if (tache.is_complete) {
            fermer.classList.add('hide');
        } else {
            ouvrir.classList.add('hide');
        }
        //On complete la page avec les informations de la tache
        document.querySelector("h1.masthead-heading").innerHTML = tache.text;
        document.querySelector("div#id").textContent = tache.id;
        document.querySelector("div#date").textContent = new Date(tache.created_at).toLocaleString("fr-FR");
        const tags = document.querySelector("ul");
        tache.Tags.forEach(tag => {
            let li = document.createElement("li");
            li.textContent = tag;
            tags.appendChild(li);
        });

    } catch (e) {
        console.error(e.message);
    }
});

fermerModal.addEventListener('click', function() {
    if (dialog.open){
        dialog.close();
    } else {
        dialogValidation.close();
    }
});

validationSuppression.addEventListener('click', async function() {
    try {
        await fetch(
            `${url_API}/${idTache}`, {
                method: "DELETE"
            }).then(r => {
            if (r.ok) {
                // Une fois la suppression faite on redirige vers la liste des taches
                navigation("tasks.html");
            } else {
                setTitreModal(`Erreur ${r.status}`);
                setTexteModal(`Message d'erreur : ${r.statusText}`);
                dialog.showModal();
                throw new Error(`Erreur ${r.status} lors de la suppression de la tache.\nMessage d'erreur : ${r.statusText}`);
            }
        });
    } catch (error) {
        console.error(error.message);
    }
});

supprimer.addEventListener("click", function () {
    dialogValidation.showModal();
});

retourListe.addEventListener("click", async e => {
    e.preventDefault();
    navigation("tasks.html")
});

function changerStatut() {
    console.info('Tâche : ', tache)
    tache.is_complete = !tache.is_complete;
    console.info('Tâche modifiée : ', tache)
    let urlPut = url_API + '/' + idTache;
    fetch( urlPut, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tache)
    }).then(r => {
        if (r.ok) {
            // On ajoute ou retire la classe hide en fonctino du nouveau statut de la tache
            if (tache.is_complete) {
                fermer.classList.add('hide');
                ouvrir.classList.remove('hide');
            } else {
                ouvrir.classList.add('hide');
                fermer.classList.remove('hide');
            }
            // On recharge la page
            window.location.reload();
        } else {
            setTitreModal(`Erreur ${r.status}`);
            setTexteModal(`Message d'erreur : ${r.statusText}`);
            dialog.showModal();
            throw new Error(`Erreur ${r.status} lors du changement de statut de la tache.\nMessage d'erreur : ${r.statusText}`);
        }
    }).catch(
        err => {
            console.error(err.message);
        }
    )
}