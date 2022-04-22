const { MongoClient, ObjectId } = require('mongodb');
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

    // HTTP DELETE pour supprimer un document
    app.delete('/api/games/:id', (req, res) => {
        client.db('tictactoe').collection('games').deleteOne({_id: ObjectId(req.params.id)}, (error, result) => {
            if (error) {
                console.error(error);
                res.statusCode = 500;
                res.json({success: false, message: 'error'});
            }
            res.statusCode = 200;
            res.json({success: true, message: 'document deleted'});
        });
    });

    // HTTP PUT pour ajouter un document
    app.put('/api/games/:id', (req, res) => {
        let id = req.params.id;
        let game = req.body;
        client.db('tictactoe').collection('games').replaceOne({_id: ObjectId(id)}, game, (error, result) => {
            if (error) {
                console.error(error);
                res.statusCode = 500;
                res.json({success: false, message: 'error'});
            }
            res.statusCode = 204; // la ressource a été mise à jour avec succès
            res.json({success: true, message: 'document updated'});
        });
    });

    // HTTP GET pour Read un document
    app.get('/api/games/:id', (req, res) => {
        let id = req.params.id;
        client.db('tictactoe').collection('games').findOne({_id: ObjectId(id)}, (error, result) => {
            if (error) {
                console.error(error);
                res.statusCode = 500;
                res.json({success: false, message: 'error'});
            }
            res.statusCode = 200;
            res.json(result);
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