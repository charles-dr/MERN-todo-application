import {
  CREATE_TASK,
  LOAD_TASKS,
  LOADED_TASKS,
  UPDATE_TASK,
} from '../store.constant';
import * as api from '../../api';

export const loadTaskAndDispatch = (dispatch) => {
  return api.getTasks()
    .then(tasks => dispatch({
      type: LOADED_TASKS,
      payload: tasks,
    }));
}

export const createTask = (title) => {
  return async dispatch => {
    return api.createTask(title)
      .then((task) => loadTaskAndDispatch(dispatch));
  }
}

export const loadTasks = () => {
  return async dispatch => {
    return api.getTasks()
      .then(tasks => {
        console.log('[Tasks] Loaded', tasks)
        return dispatch({
        type: LOADED_TASKS,
        payload: tasks,
      })});
  }
}

export const updateTask = (id, status) => {
  return async dispatch => {
    return api.updateTask(id, status)
      .then(task => loadTaskAndDispatch(dispatch));
  }
}
