let modifyId = '';  // identifiant du document à modifier, si == '', c'est qu'il n'y a pas de document à modifier

initTable();

function hideAllPages() {
    document.getElementById('table-page').style.display = 'none';
    document.getElementById('create-page').style.display = 'none';
    document.getElementById('update-page').style.display = 'none';
}

function showCreatePage() {
    modifyId = '';
    showPage('create-page');
}

function showUpdatePage(id) {
    modifyId = id;
    showPage('create-page');
}

function showPage(id) {
    hideAllPages();
    document.getElementById(id).style.display = 'block';
}

function initTable() {
    showPage('table-page');
    fetch('api/games')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ttt-table').innerHTML = buildTable(data);
    })
    .catch(error => console.error(error));
}

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
            '<td><button class="btn btn-success me-2" onclick="onUpdateHandler(this)">modifier</button>' +
            '<button class="btn btn-danger" onclick="onDeleteHandler(this)">supprimer'
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

function onUpdateHandler(button) {
    const tr = button.parentNode.parentNode;
    const id = tr.firstChild.innerText;
    showUpdatePage(id);
    fetch(`api/games/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('status').value = data.status;
        document.getElementById('playerX').value = data.playerX;
        document.getElementById('playerO').value = data.playerO;
    })
    .catch(error => console.error(error));
    return false;
}

function saveGame() {
    let game = {
        status: document.getElementById('status').value,
        playerX: document.getElementById('playerX').value,
        playerO: document.getElementById('playerO').value
    };

    fetch('api/games/' + modifyId, {
        method: modifyId === '' ? 'POST': 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
    .then(response => {
        initTable();
        showPage('table-page');
    })
    .catch(error => console.error(error));
    return false;
}
