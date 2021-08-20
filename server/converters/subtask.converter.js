const { Serializer, Deserializer } = require('jsonapi-serializer');

module.exports = {
  serializer: new Serializer('subtasks', {
    topLevelLinks: {
      self: (records) => {
        return records.length !== undefined ? '/subtasks' : `/subtasks/${records.id}`;
      },
    },
    attributes: [
      'title',
      'status',
      'task',
      'created_at',
    ],
    task: {
      ref: 'id',
    },
  }),
  deserializer: new Deserializer({
    tasks: {
      valueForRelationship: (relationship) => {
        return relationship.id
      },
    },
  }),
};
