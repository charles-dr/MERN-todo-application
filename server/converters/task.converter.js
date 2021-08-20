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
      'parent',
      'created_at',
    ],
    parent: {
      ref: 'id',
      included: true,
      // attributes: ['status'],
    },
  }),
  deserializer: new Deserializer({
    tasks: {
      valueForRelationship: (relationship) => {
        return relationship.id
      },
    }
  }),
};
