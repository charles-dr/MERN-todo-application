import { apiInstance } from './index';
import * as converters from '../converters';

export const getTasks = () => {
  return apiInstance.get('/tasks')
    .then(({ data, status }) => {
      return converters.task.deserializer.deserialize(data);
    });
}

export const createTask = (title) => {
  const jsonapi = converters.task.serializer.serialize({ title });
  return apiInstance.post('/tasks', jsonapi)
    .then(({ data, res }) => {
      return converters.task.deserializer.deserialize(data);
    });
}

export const updateTask = async (id, status) => {
  const jsonapi = converters.task.serializer.serialize({ id, status });
  return apiInstance.patch(`/tasks/${id}`, jsonapi)
    .then(({ data, status }) => {
      return converters.task.deserializer.deserialize(data);
    });
}