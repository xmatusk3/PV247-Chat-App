import { combineReducers } from 'redux';
import { incresdNumbah } from './demoDirectory/demoReducer';

export const app = combineReducers({
    incresdNumbah,
});