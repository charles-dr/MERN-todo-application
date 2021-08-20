const express = require('express');
const models = require('../models');
const converters = require('../converters');
const router = express.Router();

const activity = {
  updateParentSubtasks: (parentId) => {
    return Promise.all([
      models.task.findOne({ _id: parentId }),
      models.subtask.find({ task: parentId }),
    ])
      .then(([task, subtasks]) => {
        task.subtasks = subtasks.map(it => it._id);
        task.status = subtasks.length ? subtasks.reduce((tot, st) => tot = tot && st.status, true) : task.status;
        return task.save();
      });
  },
};

/**
 * @description get a subtask by id
 */
router.route('/:id').get((req, res) => {
  return models.subtask.findOne({ _id: req.params.id }).populate('task')
    .then(subtask => {
      return res.send(converters.subtask.serializer.serialize(subtask))
    });
})

/**
 * @description create a subtask
 */
router.route('/').post((req, res) => {
  return converters.subtask.deserializer.deserialize(req.body)
    .then(subtask => {
      return models.subtask.create(subtask)
    })
    .then(subtask => Promise.all([
      models.subtask.findOne({ _id: subtask._id }).populate('task'),
      activity.updateParentSubtasks(subtask.task),
    ]))
    .then(([subtask]) => res.send(converters.subtask.serializer.serialize(subtask)));
});

module.exports = router;