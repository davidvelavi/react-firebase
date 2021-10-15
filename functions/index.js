const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.get('/post', (req, res) => {
  console.log('params', req.params);
  console.log('path', req.path);
  console.log('method', req.method);
  const m = { 'name': 'David' };

  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((data) => {
      console.log('Sucess');
      res.send({ data: data.data });
    })
    .catch((e) => {
      console.log('Error', e);
      res.sendStatus(e);
    });

});

exports.helloWorld = functions.https.onRequest(app);

