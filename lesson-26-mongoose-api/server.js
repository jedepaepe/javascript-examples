const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

async function main() {
    await mongoose.connect(`mongodb://localhost:27017/sales`);
    console.log('connected to mongodb');
}
main().catch(err => console.log(err));

const contactSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String
});

const Contact = mongoose.model('contacts', contactSchema);

const app = express();
app.use(cors);
app.use(express.json());

app.get('/api/contacts', async (req, res) => {
    console.log('get');
    const contacts = await Contact.find({});
    res.json(contacts);
});

app.post('/api/contacts', async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        res.json(contact);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
})

app.listen(3000, () => console.log('browse http://localhost:3000/api/contacts'));