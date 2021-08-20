const { Serializer, Deserializer } = require('jsonapi-serializer');

module.exports = {
  serializer: new Serializer('tasks', {
    topLevelLinks: {
      self: (records) => {
        return records.length !== undefined ? '/tasks' : `/tasks/${records.id}`;
      },
    },
    attributes: [
      'title',
      'status',
      'subtasks',
      'created_at',
    ],
    subtasks: {
      ref: 'id',
      // included: true,
      attributes: ['title', 'status'],
    },
  }),
  deserializer: new Deserializer({
    subtasks: {
      valueForRelationship: (relationship) => {
        return relationship.id
      },
    },
  }),
};
