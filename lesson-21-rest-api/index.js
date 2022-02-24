const express = require('express');
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

const app = express();

app.get('/api/contacts', onHttpGetContacts);

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(3000, () => console.log("prêt sur http://localhost:3000"));

function onHttpGetContacts(req, res) {
    client.connect(onDbConnected);

    function onDbConnected (err, client) {
        if (err) {
            console.error('error: ', err);
            res.send('error');
        }
        const sales = client.db('sales');
        const contacts = sales.collection('contacts');
        const cursor = contacts.find();
        cursor.toArray(onContactsReceivedFromDb);
    
        function onContactsReceivedFromDb(err, data) {
            if (err) {
                console.log('toArray error', err);
                res.send('error');
            }
            res.json(data);
        }
    }    
}
