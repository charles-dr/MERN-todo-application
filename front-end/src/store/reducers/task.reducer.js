import { LOADED_TASKS } from '../store.constant';

const defaultState = {
  tasks: [],
};

const reducer = (
  state = defaultState,
  { type, payload },
) => {
  switch (type) {
    case LOADED_TASKS:
      return { ...state, tasks: payload };
    default:
      return state;
  }
}

export default reducer;
