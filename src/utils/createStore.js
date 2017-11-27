import {
    applyMiddleware,
    compose,
    createStore as createReduxStore
} from 'redux';
import logger from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import app from '../reducers/app';
import promise from 'redux-promise';

const thunk = require('redux-thunk').default;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = (history) => {
    const router = routerMiddleware(history);
    const middleware = [router, promise, thunk, logger];

    return createReduxStore(
        connectRouter(history)(app),
        {},
        composeEnhancers(applyMiddleware(...middleware)
        ));
};