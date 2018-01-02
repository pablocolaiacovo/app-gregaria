const { getEvents, getEventById } = require('../models/event')

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