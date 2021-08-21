import { LOADED_TASKS } from '../store.constant';
import reducer from './task.reducer';

const taskLoaded = (tasks) => ({
  type: LOADED_TASKS,
  payload: tasks,
});

test('shouold return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    tasks: [],
  });
});

test('should accept the task array', () => {
  const previousState = { tasks: [] };
  const tasks = [{
    id: "611f377fe07e47f958cb462e",
    title: 'Test Task',
    status: false,
    subtasks: ['611f377fe07e47f958cb462f', '611f377fe07e47f958cb462f'],
    created_at: '2021-08-20T12:25:24.981+00:00',
  }];
  expect(reducer(previousState, taskLoaded(tasks))).toEqual({
    tasks,
  });
});
