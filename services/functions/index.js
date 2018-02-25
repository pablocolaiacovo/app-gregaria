/*
* Api entry point
*/

const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;

const RESPONSE = {
  OK: {
    success: true,
    payload: {}
  },
  ERROR: {
    success: false,
    error: ""
  }
};

// Initialize firebase stuff
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const collectionName = "events";

let app = express();
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Express endpoints for events

/*
* RESPONSE OBJECT: 
* {
*   payload: list of all events
* }
*/
app.get("/", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  let events = [];
  try {
    db
      .collection(collectionName)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let event = doc.data();
          Object.assign(event, { id: doc.id });
          events.push(event);
        });

        let response = RESPONSE.OK;
        response.payload = events;
        res.json(response);
      });
  } catch (error) {
    errorHandler(error, res);
  }
});

/*
* RESPONSE OBJECT: 
* {
*   payload: event object corresponding to the :id
*   error: message in case of an error in the try/catch block or if the event was not found
* }
*/
app.get("/:id", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  let id = req.params.id;
  try {
    db
      .collection(collectionName)
      .doc(id)
      .get()
      .then(snap => {
        if (snap.exists) {
          let event = snap.data();
          Object.assign(event, { id: id });
          // get the collaboratiosn and append them to the event object
          snap.ref
            .collection("collaborations")
            .get()
            .then(collsSnap => {
              let collaborations = [];
              collsSnap.forEach(doc => {
                let collaboration = doc.data();
                collaborations.push(collaboration);
                Object.assign(event, { collaborations: collaborations });
              });

              let response = RESPONSE.OK;
              response.payload = event;
              return res.json(response);
            });
        } else {
          let response = RESPONSE.ERROR;
          response.error = "No event found";
          return res.json(response);
        }
      });
  } catch (error) {
    errorHandler(error, res);
  }
});

/*
* RESPONSE OBJECT: 
* {
*   payload: new event object added to the db
* }
*/
app.post("/", (req, res) => {
  let newEvent = req.body;
  try {
    db
      .collection(collectionName)
      .add(newEvent)
      .then(snap => {
        snap.get().then(doc => {
          let eventAdded = doc.data();
          Object.assign(eventAdded, { id: doc.id });

          let response = RESPONSE.OK;
          response.payload = eventAdded;

          res.json(response);
        });
      });
  } catch (error) {
    errorHandler(error, res);
  }
});

/*
* Endpoint to add collaborations to a particular event (:id)
*/
app.post("/:id/collaborations", (req, res) => {
  console.log("Trying to add ", req.body, " to event id: ", req.params.id);

  let id = req.params.id;
  let collaboration = req.body;
  Object.assign(collaboration, { date: FieldValue.serverTimestamp() });
  try {
    let event = db.collection(collectionName).doc(id);
    event
      .collection("collaborations")
      .add(collaboration)
      .then(snap => {
        snap.get().then(doc => {
          let collaborationAdded = doc.data();
          Object.assign(collaborationAdded, { id: doc.id });

          let response = RESPONSE.OK;
          response.payload = collaborationAdded;

          res.json(response);
        });
      });
  } catch (error) {
    errorHandler(error, res);
  }
});

/*
* RESPONSE OBJECT: 
* {
*   payload: updated data of the event
* }
*/
app.put("/:id", (req, res) => {
  let id = req.params.id;
  let eventData = req.body;

  try {
    db
      .collection(collectionName)
      .doc(id)
      .update(eventData)
      .then(snap => {
        let eventUpdated = eventData;
        Object.assign(eventUpdated, { id: id });

        let response = RESPONSE.OK;
        response.payload = eventUpdated;

        res.json(response);
      });
  } catch (error) {
    errorHandler(error, res);
  }
});

/*
* RESPONSE OBJECT: 
* {
*   payload: event id of the deleted event
* }
*/
app.delete("/:id", (req, res) => {
  let id = req.params.id;
  try {
    db
      .collection(collectionName)
      .doc(id)
      .delete()
      .then(snap => {
        let response = RESPONSE.OK;
        response.payload = id;
        res.json(response);
      });
  } catch (error) {
    errorHandler(error, res);
  }
});

// Expose Express API
exports.events = functions.https.onRequest(app);

// Private Functions

function errorHandler(error, res) {
  let response = RESPONSE.ERROR;
  response.error = error;
  res.json(response);
}
