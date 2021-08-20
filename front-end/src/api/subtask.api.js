import { apiInstance } from './index';
import * as converters from '../converters';

export const createSubTask = (title, todo_id) => {
  const jsonapi = converters.subtask.serializer.serialize({ title, parent: todo_id });
  return apiInstance.post('/subtasks', jsonapi)
    .then(({ data, status }) => {
      return converters.subtask.deserializer(data);
    });
}

