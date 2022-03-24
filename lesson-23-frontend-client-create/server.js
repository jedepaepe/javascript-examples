const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const client = new MongoClient('mongodb://localhost:27017');

client.connect( (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    const app = express();

    app.use(express.static('public'));

    app.use(bodyParser.json({ extended: true }));

    // HTTP POST pour Create un document
    app.post('/api/games', (req, res) => {
        let game = req.body;
        client.db('tictactoe').collection('games').insertOne(game, (error, result) => {
            if (error) {
                console.error(error);
                res.statusCode = 500;
                res.json({success: false, message: 'error'});
            }
            res.statusCode = 201;
            res.json({success: true, message: 'document saved'});
        });
    });

    // code de test
    app.post('/process-form', (req, res) => {
        console.error(req.body);
        let game = req.body;
        client.db('tictactoe').collection('games').insertOne(game, (error, result) => {
            if (error) {
                console.error(error);
                res.status = 500;
                res.send('error');
            }
            res.status = 201;
            res.send('document saved');
        });
    });

    // HTTP GET pour Read tous les documents
    app.get('/api/games', (req, res) => {
        client.db('tictactoe').collection('games').find().toArray((error, data) => {
            if (error) {
                console.error(error);
                res.json({success: false, message: 'error'});
            }
            res.json(data);
        });
    });

    // HTTP POST pour Create un document
    // app.post('/api/games', (req, res) => {
    //     res.send("not yet implented");
    // });

    app.listen(3000, () => console.log('ready on http://localhost:3000/'));
});