import { apiInstance } from './index';
import * as converters from '../converters';

export const createSubTask = (title, todo_id) => {
  console.log('[Subtask API]', title, todo_id, { title, parent: { id: todo_id } });
  const jsonapi = converters.subtask.serializer.serialize({ title, task: { id: todo_id, type: 'tasks'} });
  console.log('[Serialized]', jsonapi.data);
  return apiInstance.post('/subtasks', jsonapi)
    .then(({ data, status }) => {
      return converters.subtask.deserializer.deserialize(data);
    });
}

