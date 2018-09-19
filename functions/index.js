const functions = require('firebase-functions');
const express = require('express');
const activities = require('./middleware/activities');

const app = express();

app.get('/', activities.query);
app.post('/', activities.update);

exports.activities = functions.https.onRequest(app);
