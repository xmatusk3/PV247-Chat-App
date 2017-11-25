import { combineReducers } from 'redux';
import authenticationReducers from './shared/authenticationReducers';
import channelReducers from './channels/channelReducers';

const app = combineReducers({
    auth: authenticationReducers,
    channels: channelReducers,
});

export default app;