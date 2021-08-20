const express = require('express');
const models = require('../models');
const converters = require('../converters');
const router = express.Router();

router.route('/:id').get((req, res) => {
  const { serializer } = converters.task;
  return models.task.findOne({ _id: req.params.id }).populate('parent')
    .then(task => res.send(serializer.serialize(task)));
});

router.route('/').get((req, res) => {
  return models.task.find()
    .then(tasks => {
      console.log('[Tasks]', tasks.length);
      return res.send(converters.task.serializer.serialize(tasks));
    })
});

router.route('/').post((req, res) => {
  return converters.task.deserializer.deserialize(req.body)
    .then(task => models.task.create(task))
    .then(task => res.send(converters.task.serializer.serialize(task)));
});

module.exports = router;
