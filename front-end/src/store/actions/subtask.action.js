import {
  CREATE_SUBTASK,
  UPDATE_SUBTASK,
  LOAD_TASKS,
} from '../store.constant';
import * as api from '../../api';

export const createSubtask = (title, todo_id) => {
  return async dispatch => {
    return api.createSubTask(title, todo_id)
      .then((subtask) => {
        console.log('[Subtask] created.', subtask);
        dispatch({ type: LOAD_TASKS });
      });
  }
}


