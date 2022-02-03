const express = require('express');
const app = express();
const port = 4005;

// quand on reçoit une commande HTTP GET
// exécute la fonction flèchée
app.get('/', (request, response) => {
    response.send('Hello racine');
});

app.get('/res1', (request, response) => {
    response.send('Hello res1');
});

app.get('/res2', (request, response) => {
    response.send('Hello res 2');
});

app.get('/*', (request, response) => {
    response.send('La ressource que vous avez demandé n\'existe pas');
});

app.listen(port, () => {
    console.log(`prêt sur le http://localhost:${port}`);
});