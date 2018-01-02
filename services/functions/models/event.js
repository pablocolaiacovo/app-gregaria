const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.getEvents = () => getAllEvents();
exports.getEventById = (id) => getEventById(id);

async function getAllEvents() {
    try {
        let docs = [];
        let snapshot = await db.collection('events').get();
        snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
        return docs;
    } catch (err) {
        throw err;
    }
}

async function getEventById(id) {
    try {
        let docRef = await db.collection('events').doc(id);
        let snapshot = await docRef.get();
        return snapshot.exists ? { id: id, ...snapshot.data(), success: true } : { success: false, message: 'No event found' };
    } catch (err) {
        throw err;
    }
}

async function getAllFirebaseDocsIds() {
    let ids = [];
    let snapshot = await db.collection(collectionName).get();
    snapshot.forEach(doc => ids.push(doc.id));
    return ids;
}

async function getFirebaseDoc(docName) {
    try {
        let res = {
            id: docName
        };
        let snapshot = await db.collection(collectionName).get();
        snapshot.forEach(doc => {
            if (doc.id == docName) {
                res.data = doc.data();
            }
        });
        return res;
    } catch (err) {
        throw err;
    }
};

async function setFirebaseDoc(updatedDoc) {
    try {
        let docRef = db.collection(collectionName).doc(updatedDoc.id);
        await docRef.set(updatedDoc.data);
        return updatedDoc;
    } catch (err) {
        throw err;
    }
}