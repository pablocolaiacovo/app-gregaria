/*
* Controller methods. Here is the business logic to manage the data access layer
*/

const { getEventById, getAllEvents, addEvent, updateEventById, deleteEventById } = require('./eventsRepository')

/*
* Get all the evnts from the database
* req: Http request object
* res: Http response object
* next: Next method for callback function
*/
exports.getAllEvents = (req, res, next) => {
    getAllEvents()
        .then(eventsSnapshot => {
            let events = [];
            eventsSnapshot.forEach(doc => events.push({ id: doc.id, ...doc.data() }))
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
exports.getEventById = (req, res, next) => {
    getEventById(req.params.id)
        .then(eventSnapshot => {
            res.data = eventSnapshot.exists ? { id: req.params.id, ...eventSnapshot.data(), success: true } : { success: false, message: 'No event found' };
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
exports.addEvent = (req, res, next) => {
    addEvent(req.body)
        .then(eventSnapshot => {
            eventSnapshot.get().then(doc => {
                res.data = { id: doc.id, ...doc.data(), success: true };
                next();
            });
        })
        .catch(err => {
            next(new Error(err));
        })
}

// /*
// * Updates an event in the database
// * req: Http request object. Includes the complete event object to update in the database in req.body and the event id in req.params.id
// * res: Http response object
// * next: Next method for callback function
// */
exports.updateEventById = (req, res, next) => {
    updateEventById(req.params.id, req.body)
        .then(eventSnapshot => {
            res.data = { id: req.params.id, ...req.body, success: true };
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}

// /*
// * Deletes an event from the database
// * req: Http request object. Includes the id of the event to delete in the req.params.id parameter
// * res: Http response object
// * next: Next method for callback function
// */
exports.deleteEventById = (req, res, next) => {
    deleteEventById(req.params.id)
        .then(deletedSnapshot => {
            res.data = { id: req.params.id, success: true }
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
}