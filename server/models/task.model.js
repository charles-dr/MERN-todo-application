const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  parent: {
    ref: 'Task',
    type: ObjectId,
    default: null,
  },
  subtasks: {
    type: [{
      ref: 'Task',
      type: ObjectId,
    }],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', schema);
