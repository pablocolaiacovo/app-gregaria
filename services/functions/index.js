/*
* Api entry point
*/

const functions = require('firebase-functions');
const express = require('express');
const { getEventById, getAllEvents, addEvent, updateEventById, deleteEventById } = require('./events/eventsController');

let app = express();
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

app.get('/', getAllEvents, (req, res) => res.json(res.data));
app.get('/:id', getEventById, (req, res) => res.json(res.data));
app.post('/', addEvent, (req, res) => res.json(res.data));
app.put('/:id', updateEventById, (req, res) => res.json(res.data));
app.delete('/:id', deleteEventById, (req, res) => res.json(res.data));

// Expose Express API
exports.events = functions.https.onRequest(app);