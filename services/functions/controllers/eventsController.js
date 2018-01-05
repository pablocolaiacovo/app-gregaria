const { getEvents, getEventById, addEvent, updateEvent, deleteEvent } = require('../models/event')

exports.ctrlGetAllEvents = (req, res, next) => {
    getAll()
        .then(data => {
            res.data = data;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
};

exports.ctrlGetEventById = (req, res, next) => {
    getById(req)
        .then(data => {
            res.data = data;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
}

exports.ctrlAddEvent = (req, res, next) => {
    saveEvent(req.body)
        .then(data => {
            res.data = data;
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}

exports.ctrlUpdateEvent = (req, res, next) => {
    saveEvent(req.body, req.params.id, true)
        .then(data => {
            res.data = data;
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}

exports.ctrlDeleteEvent = (req, res, next) => {
    deleteEventById(req.params.id)
        .then(data => {
            res.data = data;
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}

async function saveEvent(data, id, update) {
    try {
        if (update) {
            return await updateEvent(id, data);
        }

        return await addEvent(data);
    } catch (err) {
        throw err;
    }
}

async function getById(req) {
    try {
        let id = req.params.id;
        return await getEventById(id);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return await getEvents();
    } catch (err) {
        throw err;
    }
}

async function deleteEventById(id) {
    try {
        return await deleteEvent(id);
    } catch (err) {
        throw err;
    }
}