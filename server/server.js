const express = require('express');
const API = require('json-api');
const mongoose = require('mongoose');

const appConfig = require('./config/app.config');

const app = express();

app.get('/ping', (req, res) => res.send('Pong!'));

app.use((req, res, next) => {
  return res.status(404).send('Not found!');
});

app.listen(appConfig.PORT, () => console.log(`Server running on port ${appConfig.PORT}`));

