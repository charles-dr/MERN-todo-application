import {
  CREATE_TASK,
  LOAD_TASKS,
  LOADED_TASKS,
  UPDATE_TASK,
} from '../store.constant';
import * as api from '../../api';

export const createTask = (title) => {
  return async dispatch => {
    return api.createTask(title)
      .then((task) => api.getTasks())
      .then((tasks) => dispatch({
        type: LOADED_TASKS,
        payload: tasks,
      }));
  }
}

export const loadTasks = () => {
  return async dispatch => {
    return api.getTasks()
      .then(tasks => {
        console.log('[Redux][Action] Tasks loaded', tasks);
        dispatch({
          type: LOADED_TASKS,
          payload: tasks,
        })
      });
  }
}
