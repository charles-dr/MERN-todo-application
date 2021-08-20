import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import taskReducer from './reducers/task.reducer';

const reducers = combineReducers({
    task: taskReducer,
});

let allStoreEnhancers;
if (process.env.NODE_ENV === 'development') {
    const reduxDevtools =
        typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
            ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    allStoreEnhancers = compose(applyMiddleware(thunk), reduxDevtools);

} else {
    allStoreEnhancers = compose(applyMiddleware(thunk));
}

const makeStore = () => {
    const store = createStore(reducers, allStoreEnhancers)
    return store
}

export default makeStore;