import { combineReducers } from 'redux';
import { isAuthenticating } from './shared/isAuthenticating';
import { channelReducers } from './channels/channelReducers';
//import { shared } from './shared/shared';
//import { incresdNumbah } from './demoDirectory/demoReducer';

export const app = combineReducers({
    isAuthenticating,
    channels: channelReducers,
});