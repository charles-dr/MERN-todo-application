const { Serializer, Deserializer } = require('jsonapi-serializer');

module.exports = {
  serializer: new Serializer('tasks', {
    topLevelLinks: {
      self: (records) => {
        // console.log('[records]', records)
        return 'http://localhost:3200';
      },
    },
    attributes: [
      'title',
      'status',
      'created_at',
    ],
  }),
  deserializer: new Deserializer({
    tasks: {
      valueForRelationship: (relationship) => {
        return relationship.id
      },
    }
  }),
};
