const ctx = document.getElementById('myChart');
const retourListe = document.getElementById("retourListe");

window.addEventListener("load", async function() {
    const response = await fetch(url_API);
    const json = await response.json();
    let tacheTerminee = json[0].todolist.filter(t => t.is_complete).length;
    let tacheEnCours = json[0].todolist.filter(t => !t.is_complete).length;
    let total = json[0].todolist.length;

    const data = {
        labels: [
            `Total (${total})`,
            `En cours (${tacheEnCours})`,
            `Terminées (${tacheTerminee})`
        ],
        datasets: [{
            label: '',
            data: [total, tacheEnCours, tacheTerminee],
            backgroundColor: [
                'rgb(75, 192, 192)',
                'rgb(26, 188, 156)',
                'rgb(44, 62, 80)'
            ],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

});

retourListe.addEventListener("click", async e => {
    e.preventDefault();
    navigation("tasks.html");
});

