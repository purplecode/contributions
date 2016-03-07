import ThunkMiddleware from 'redux-thunk';
import Logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

const loggerMiddleware = Logger();

const createStoreWithMiddleware = applyMiddleware(
    ThunkMiddleware//,
    //loggerMiddleware
)(createStore);

export default createStoreWithMiddleware(reducers);
