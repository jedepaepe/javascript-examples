fetch('api/games')
.then(response => {
    response.json()
    .then(data => {
        document.getElementById('content').innerHTML = `<pre>${data.map(d => Object.values(d).join(' - ')).join('\n')}</pre>`;
    })
    .catch(error => console.error(error));
})
.catch(error => console.log(error));