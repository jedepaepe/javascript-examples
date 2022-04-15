fetch('api/games')
.then(response => response.json())
.then(data => {
    document.getElementById('content').innerHTML = buildTable(data);
})
.catch(error => console.error(error));

function buildTable(games) {
    if (! games || ! games.length || games.length === 0) {
        return '<p>Pas de parties'
    }
    const thead = '<tr>' + Object.keys(games[0]).map(k => '<th>' + k).join('') + '<td>';
    const tbody = games.map(game => 
            '<tr>' + 
            Object.values(game)
                .map(property => '<td class="align-middle">' + property)
                .join('') + 
            '<td><button class="btn btn-danger" onclick="onDeleteHandler(this)">supprimer'
        ).join('');
    return `<table class="table table-striped"><thead>${thead}<tbody>${tbody}`;
}

function onDeleteHandler(button) {
    const tr = button.parentNode.parentNode;
    const id = tr.firstChild.innerText;
    fetch(`api/games/${id}`, { method: 'DELETE' })
    .then(data => {
        console.log(`${id} supprimé`);
        tr.remove();
    })
    .catch(error => console.error(error));
    return false;
}