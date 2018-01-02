const functions = require('firebase-functions');
const express = require('express');
const { ctrlGetAllEvents, ctrlGetEventById } = require('./controllers/eventsController');

let app = express();
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

app.get('/', ctrlGetAllEvents, (req, res) => res.json(res.data));
app.get('/:id', ctrlGetEventById, (req, res) => res.json(res.data));
app.post('/', (req, res) => res.send('after this you created an event'));
app.put('/:id', (req, res) => res.send('this is the endpoint to update an event'));
app.delete('/:id', (req, res) => res.send('this is the endpoint to delete an event'));

// Expose Express API
exports.events = functions.https.onRequest(app);