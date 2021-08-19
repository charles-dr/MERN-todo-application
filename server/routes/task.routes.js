const express = require('express');
const models = require('../models');
const converters = require('../converters');
const router = express.Router();

router.route('/').get((req, res) => {
  return models.task.find()
    .then(tasks => {
      console.log('[Tasks]', tasks.length);
      return res.send(converters.task.serializer.serialize(tasks));
    })
});

router.route('/').post((req, res) => {
  return converters.task.deserializer.deserialize(req.body)
    .then(task => {
      return res.json(task);
    })
});

module.exports = router;
