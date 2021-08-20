const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const appConfig = require('./config');
const models = require('./models');

const app = express();

// to fix waring: DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated
mongoose.Promise = global.Promise;
// connect to database
mongoose.connect(appConfig.dbURL, appConfig.dbOptions, (error) => {
  if (!error) {
    console.log('[MongoDB] connected!');
  } else {
    console.log(`[MongoDB] failed to connect. Log: ${JSON.stringify(error)}`);
  }
});

app.use(cors());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// routers
app.use('/tasks', require('./routes/task.routes'));
app.use('/subtasks', require('./routes/subtask.routes'));


app.get('/ping', (req, res) => res.send('Pong!'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: [ err.message ],
  });
});

module.exports = app;

