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
      'subtasks',
      'created_at',
    ],
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

export const subtask = {
  serializer: new Serializer('subtasks', {
    topLevelLinks: {
      self: (records) => {
        return records.length !== undefined ? '/subtasks' : `/subtasks/${records.id}`;
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
      included: false,
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