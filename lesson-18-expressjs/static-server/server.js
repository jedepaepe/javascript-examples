const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
let filename = "fichier-";
let index = 1;

app.use(express.static('public'));

// code stupide mais qui illustre une utilisation de fs
app.get('/create', (req, res) => {
    fs.writeFileSync(filename + index, "" + index);
    ++index;
    res.send(`fichier ${filename}${index} créé`);
});

app.get('/*', (req, res) => {
    res.send('pas de ressource ici');
});

app.listen(port, () => {
    console.log(`ready http://localhost:${port}`);
});