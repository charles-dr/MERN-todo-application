import { apiInstance } from './index';
import * as converters from '../converters';

export const createSubTask = (title, todo_id) => {
  const jsonapi = converters.subtask.serializer.serialize({ title, task: { id: todo_id, type: 'tasks'} });
  return apiInstance.post('/subtasks', jsonapi)
    .then(({ data, status }) => {
      return converters.subtask.deserializer.deserialize(data);
    });
}

export const updateSubtask = (id, status) => {
  const jsonapi = converters.subtask.serializer.serialize({ id, status });
  return apiInstance.patch(`/subtasks/${id}`, jsonapi)
    .then(({ data, status }) => {
      return converters.task.deserializer.deserialize(data);
    });
}
