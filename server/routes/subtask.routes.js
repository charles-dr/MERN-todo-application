const express = require('express');
const models = require('../models');
const converters = require('../converters');
const router = express.Router();

router.route('/:id').get((req, res) => {
  const { serializer } = converters.subtask;
  return models.subtask.findOne({ _id: req.params.id }).populate('parent')
    .then(subtask => res.send(serializer.serialize(subtask)));
});

router.route('/').post((req, res) => {
  return converters.subtask.deserializer.deserialize(req.body)
    .then(subtask => models.subtask.create(subtask))
    .then(subtask => res.send(converters.task.serializer.serialize(subtask)));
});

module.exports = router;