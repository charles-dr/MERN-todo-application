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
      attributes: ['title', 'status'],
    },
  }),
  deserializer: new Deserializer({}),
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