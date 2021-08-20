const express = require('express');
const models = require('../models');
const converters = require('../converters');
const router = express.Router();

router.route('/:id').get((req, res, next) => models.task.findOne({ _id: req.params.id }).populate('subtasks')
  .then(task => {
    if (!task) {
      const err = new Error(`Task with id "${req.params.id}" does not exist!`);
      err.status = 404;
      return next(err);
    }
    res.send(converters.task.serializer.serialize(task));
  }));
  

/**
 * @description load all tasks.
 */
router.route('/').get((req, res) => {
  return models.task.find().populate('subtasks')
    .then(tasks => {
      return res.send(converters.task.serializer.serialize(tasks));
    })
});

/**
 * @description create a task.
 */
router.route('/').post((req, res) => {
  return converters.task.deserializer.deserialize(req.body)
    .then(task => models.task.create(task))
    .then(task => res.send(converters.task.serializer.serialize(task)));
});

/**
 * @description update task status
 */
router.route('/:id').patch((req, res) => {
  const { data: { attributes } } = req.body;
  return Promise.all([
    models.task.findOne({ _id: req.params.id }),
  ])
    .then(([task]) => {
      // now update the value in attributes.
      task.status = attributes.status;
      return Promise.all([
        task.save(),
        models.subtask.updateMany({ task: req.params.id }, { status: attributes.status }),
      ]);
    })
    .then(([task]) => res.send(converters.task.serializer.serialize(task)));
});

/**
 * @description delete a task by id.
 */
router.route('/:id').delete((req, res) => {
  return Promise.all([
    models.task.deleteMany({ _id: req.params.id }),
    models.subtask.deleteMany({ task: req.params.id }),
  ])
    .then(() => res.status(204).send(''));
});

module.exports = router;
