const express = require('express');
const API = require('json-api');
const mongoose = require('mongoose');

const appConfig = require('./config');
const models = require('./models');

const APIError = API.types.Error;
const app = express();

// connect to database
mongoose.connect(appConfig.dbURL, appConfig.dbOptions, (error) => {
  if (!error) {
    console.log('[MongoDB] connected!');
  } else {
    console.log(`[MongoDB] failed to connect. Log: ${JSON.stringify(error)}`);
  }
});

const adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry({
  tasks: require('./resource-descriptions/task'),
}, { dbAdapter: adapter });

const Controller = new API.controllers.API(registry);
const Docs = new API.controllers.Documentation(registry, { name: 'Todo API' });

const Front = new API.httpStrategies.Express(Controller, Docs, { host: appConfig.domain });
const apiReqHandler = Front.apiRequest;


app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/ping', (req, res) => res.send('Pong!'));

app.get('/docs', Front.docsRequest);

app.route('/:type(tasks)')
  .get(apiReqHandler)
  .post(apiReqHandler)
  .patch(apiReqHandler);

app.route('/:type(tasks)/:id')
  .get(apiReqHandler)
  .patch(apiReqHandler)
  .delete(apiReqHandler);

app.get('/:type(tasks)/subtasks', Front.customAPIRequest({
  queryFactory: async (opts) => {
    // console.log('[Opts]', opts.request.id);
    const originQuery = await opts.makeQuery(opts);
    return originQuery;//.andWhere({ field: 'status', operator: 'eq', value: true })
  }
}));


app.use((req, res, next) => {
  Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

app.listen(appConfig.port, () => console.log(`[Server] running on port ${appConfig.port}`));

