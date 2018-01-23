/*
* Api entry point
*/

const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

// Initialize firebase stuff
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const collectionName = 'events';
// const { getEventById, getAllEvents, addEvent, updateEventById, deleteEventById } = require('./events/eventsController');

let app = express();
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

/*
* Express endpoints for events
*/ 
app.get('/', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    let events = [];
    db.collection(collectionName).get().then(snap => {
        snap.forEach(doc => {
            let event = doc.data();
            Object.assign(event, { id: doc.id });
            events.push(event)
        });
        res.json(events);
    });
});

app.get('/:id', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    let id = req.params.id;
    db.collection(collectionName).doc(id).get().then(snap => {
        if(snap.exists){
            let event = snap.data();
            Object.assign(event, { id: id, success: true });
            res.json(event);
        }
        else{
            res.json({ success: false, message: "No event found" });
        }
    })
});

app.post('/', (req, res) => {
    let newEvent = req.body;
    db.collection(collectionName).add(newEvent).then(snap => {
        snap.get().then(doc => {
            let eventAdded = doc.data();
            Object.assign(eventAdded, { id: doc.id });
            res.json(eventAdded);
        })
    })
});

app.put('/:id', (req, res) => {
    let id = req.params.id;
    let eventData = req.body;

    db.collection(collectionName).doc(id).update(eventData).then(snap => {
        let eventUpdated = eventData;
        Object.assign(eventUpdated, { id: id }); 
        res.json(eventUpdated);
    })
});

app.delete('/:id', (req, res) => {
    let id = req.params.id;

    db.collection(collectionName).doc(id).delete().then(snap => {
        let deletedEvent = { id: id, success: true };
        res.json(deletedEvent);
    })
});

// Expose Express API
exports.events = functions.https.onRequest(app);