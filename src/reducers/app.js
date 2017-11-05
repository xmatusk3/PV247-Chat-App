import { combineReducers } from 'redux';
import { isAuthenticating } from './shared/isAuthenticating';
//import { shared } from './shared/shared';
//import { incresdNumbah } from './demoDirectory/demoReducer';

export const app = combineReducers({
    isAuthenticating,
});