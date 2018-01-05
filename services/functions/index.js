const functions = require('firebase-functions');
const express = require('express');
const { ctrlGetAllEvents, ctrlGetEventById, ctrlAddEvent, ctrlUpdateEvent, ctrlDeleteEvent } = require('./controllers/eventsController');

let app = express();
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

app.get('/', ctrlGetAllEvents, (req, res) => res.json(res.data));
app.get('/:id', ctrlGetEventById, (req, res) => res.json(res.data));
app.post('/', ctrlAddEvent, (req, res) => res.json(res.data));
app.put('/:id', ctrlUpdateEvent, (req, res) => res.json(res.data));
app.delete('/:id', ctrlDeleteEvent, (req, res) => res.json(res.data));

// Expose Express API
exports.events = functions.https.onRequest(app);