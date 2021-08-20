import * as api from '../../api';
import { loadTaskAndDispatch } from './task.action';

export const createSubtask = (title, todo_id) => {
  return async dispatch => {
    return api.createSubTask(title, todo_id)
      .then((subtask) => loadTaskAndDispatch(dispatch));
  }
}

export const updateSubtask = (id, status) => {
  return async dispatch => {
    return api.updateSubtask(id, status)
      .then(subtask => loadTaskAndDispatch(dispatch));
  }
}
