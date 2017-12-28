const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

let app = express();
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

app.get('/', (req, res) => {
    const eventsRef = db.collection('events');
    eventsRef.get()
        .then(snapshot => {
            let events = [];
            snapshot.forEach(doc => {
                events.push({id: doc.id, ...doc.data()});
            });
            res.json(events);
        })
        .catch(err => {
            res.status(500).send(err);
        });
})
app.get('/:id', (req, res) => res.send('get event by id'));
app.post('/', (req, res) => res.send('after this you created an event'));
app.put('/:id', (req, res) => res.send('this is the endpoint to update an event'));
app.delete('/:id', (req, res) => res.send('this is the endpoint to delete an event'));

// Expose Express API
exports.events = functions.https.onRequest(app);