import {
  LOADED_TASKS,
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
  return async dispatch => loadTaskAndDispatch(dispatch)
}

export const updateTask = (id, status) => {
  return async dispatch => {
    return api.updateTask(id, status)
      .then(task => loadTaskAndDispatch(dispatch));
  }
}
