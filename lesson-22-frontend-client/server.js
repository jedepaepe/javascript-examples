const { MongoClient, ExplainVerbosity } = require('mongodb');
const express = require('express');

const client = new MongoClient('mongodb://localhost:27017');

client.connect( (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    const app = express();

    app.use(express.static('public'));

    app.get('/api/games', (req, res) => {
        client.db('tictactoe').collection('games').find().toArray((err, data) => {
            if (err) {
                console.error(err);
                res.send('error');
            }
            res.json(data);
        });
    });

    app.listen(3000, () => console.log('ready on http://localhost:3000/'));
});