import { apiInstance } from './index';
import * as converters from '../converters';

export const getTasks = () => {
  return apiInstance.get('/tasks')
    .then(({ data, status }) => {
      console.log('[Status]', status, data);
      // return data;
      return converters.task.deserializer.deserialize(data);
    });
}

export const createTask = (title) => {
  const jsonapi = converters.task.serializer.serialize({ title });
  return jsonapi;
}