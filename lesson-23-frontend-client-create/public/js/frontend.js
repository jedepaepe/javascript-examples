fetch('api/games')
.then(response => response.json())
.then(data => {
    const content = document.getElementById('content');
    if (! data || ! data.length || data.length == 0) {
        content.innerHTML = '<p>Pas de parties'
    } else {
        const thead = '<tr>' + Object.keys(data[0]).map(k => '<th>' + k).join('');
        const tbody = data.map(d => '<tr>' + Object.values(d).map(c => '<td>' + c).join('')).join('');
        content.innerHTML = `<table class="table table-striped"><thead>${thead}<tbody>${tbody}`;
    }
})
.catch(error => console.log(error));