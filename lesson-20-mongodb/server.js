const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

client.connect((err, client) => {
    if (err) {
        console.error("erreur", err);
        return;
    }
    console.log('connection réussie');
    // client.db('tictactoe').collection('games').find().toArray((err, result) => {...});
    let tttDb = client.db('tictactoe');
    let games = tttDb.collection('games');
    let cursor = games.find();

    cursor.toArray((err, result) => {
        if (err) {
            console.error("erreur", err);
            return;
        }
        console.log(result);
        client.close();
    });
});
