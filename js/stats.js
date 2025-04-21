const ctx = document.getElementById('myChart');
const retourListe = document.getElementById("retourListe");
let tacheTerminee = 0;
let tacheEnCours = 0;

window.addEventListener("load", async function() {
    const response = await fetch(url_API);
    const json = await response.json();
    tacheTerminee = json[0].todolist.filter(t => t.is_complete).length;
    tacheEnCours = json[0].todolist.filter(t => !t.is_complete).length;

    const data = {
        labels: [
            `Total (${json[0].todolist.length})`,
            `En cours (${tacheEnCours})`,
            `Terminées (${tacheTerminee})`
        ],
        datasets: [{
            label: '',
            data: [json[0].todolist.length, tacheEnCours, tacheTerminee],
            backgroundColor: [
                'rgb(75, 192, 192)',
                'rgb(26, 188, 156)',
                'rgb(44, 62, 80)'
            ],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'polarArea',
        data: data,
    });

});

retourListe.addEventListener("click", async e => {
    e.preventDefault();
    window.location = url_taches;
});

