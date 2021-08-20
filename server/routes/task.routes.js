const express = require('express');
const models = require('../models');
const converters = require('../converters');
const router = express.Router();

router.route('/:id').get((req, res) => {
  const { serializer } = converters.task;
  return models.task.findOne({ _id: req.params.id })
    .then(task => res.send(serializer.serialize(task)));
});

router.route('/:id/subtasks').get((req, res) => {
  const { serializer } = converters.subtask;
  return models.subtask.find({ parent: req.params.id })
    .then(subtasks => res.send(serializer.serialize(subtasks)));
});

router.route('/').get((req, res) => {
  return models.task.find({ parent: null }).populate('subtasks')
    .then(tasks => {
      return res.send(converters.task.serializer.serialize(tasks));
    })
});

router.route('/').post((req, res) => {
  return converters.task.deserializer.deserialize(req.body)
    .then(task => models.task.create(task))
    .then(task => res.send(converters.task.serializer.serialize(task)));
});

module.exports = router;
