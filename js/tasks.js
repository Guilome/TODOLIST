const div = document.getElementById('app');
const template = document.getElementById('task-template');
const ajoutTache = document.getElementById('ajoutTache');
const accesStats = document.getElementById("stats");

window.addEventListener("load", async function() {
    try {
        console.log(location)
        const response = await fetch(url_API);
        const json = await response.json();
        const todolist = json[0].todolist.sort((a,b) => a.is_complete - b.is_complete);
        for (const todo of todolist) {
            // On recupere l'element du template
            let card = template.content.cloneNode(true);
            // On recupere chauque element à l'intérieur du template
            const id = card.getElementById('id');
            const text = card.getElementById('text');
            const lien = card.getElementById('lien');
            if (todo.is_complete) {
                // On recupère la div avec la classe tache dans l'element du templete
                let divTache = card.querySelector("div.tache");
                // Puis on lui ajoute une classe specifique
                divTache.classList.add('isComplete');
                todo.text += ' (tâche completée)';
            }
            // On complete les elements du template avec les informations de la tache
            id.textContent = todo.id;
            text.textContent = todo.text;
            lien.setAttribute('id', todo.id);
            console.info(`La tâche "` + todo.text + `" à été affiché.`);
            // On ajoute la card a la div principale
            div.append(card);
        }
    } catch (error) {
        console.error(error);

    }
});

ajoutTache.addEventListener('click', function() {
    window.open(getUrl("create_task.html"),"mozillaWindow","popup");
})

window.addEventListener( "pageshow", function ( event ) {
    if ( event.persisted ) {
        window.location.reload();
    }
});

accesStats.addEventListener("click", async e => {
    e.preventDefault();
    navigation("stat.html")
});

function getdetail(element) {
    navigation(`item.html?id=${element.id}`);
}