import { Serializer, Deserializer } from "jsonapi-serializer";

export const task = {
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
      'subtasks',
      'created_at',
    ],
    parent: {
      ref: 'id',
      included: true,
      // attributes: ['status'],
    },
    subtasks: {
      ref: 'id',
      included: true,
      attributes: ['title', 'status'],
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
