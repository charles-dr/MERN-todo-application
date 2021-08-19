const express = require('express');
const mongoose = require('mongoose');

const appConfig = require('./config');
const models = require('./models');

const app = express();

// connect to database
mongoose.connect(appConfig.dbURL, appConfig.dbOptions, (error) => {
  if (!error) {
    console.log('[MongoDB] connected!');
  } else {
    console.log(`[MongoDB] failed to connect. Log: ${JSON.stringify(error)}`);
  }
});


app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/ping', (req, res) => res.send('Pong!'));

app.use((req, res, next) => {
  return res.status(404).send('Not Found');
});

app.listen(appConfig.port, () => console.log(`[Server] running on port ${appConfig.port}`));

