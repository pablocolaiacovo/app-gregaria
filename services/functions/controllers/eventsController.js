/*
* Controller methods. Here is the business logic to manage the data access layer
*/

const { getEvents, getEventById, addEvent, updateEvent, deleteEvent } = require('../models/event')

/*
* Get all the evnts from the database
* req: Http request object
* res: Http response object
* next: Next method for callback function
*/
exports.ctrlGetAllEvents = (req, res, next) => {
    getAll()
        .then(events => {
            res.data = events;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
};

/*
* Get event by id from the database
* req: Http request object. Includes the .id param with the required event id.
* res: Http response object
* next: Next method for callback function
*/
exports.ctrlGetEventById = (req, res, next) => {
    getById(req.params.id)
        .then(event => {
            res.data = event;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
}

/*
* Add a new event to the database
* req: Http request object. Includes the complete event object in the req.body param.
* res: Http response object
* next: Next method for callback function
*/
exports.ctrlAddEvent = (req, res, next) => {
    saveEvent(req.body)
        .then(event => {
            res.data = event;
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}

/*
* Updates an event in the database
* req: Http request object. Includes the complete event object to update in the database in req.body and the event id in req.params.id
* res: Http response object
* next: Next method for callback function
*/
exports.ctrlUpdateEvent = (req, res, next) => {
    saveEvent(req.body, req.params.id, true)
        .then(event => {
            res.data = event;
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}

/*
* Deletes an event from the database
* req: Http request object. Includes the id of the event to delete in the req.params.id parameter
* res: Http response object
* next: Next method for callback function
*/
exports.ctrlDeleteEvent = (req, res, next) => {
    deleteEventById(req.params.id)
        .then(deletedResponse => {
            res.data = deletedResponse;
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}

// private functions

async function saveEvent(event, id, update) {
    try {
        if (update) {
            return await updateEvent(id, event);
        }

        return await addEvent(event);
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
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