import { combineReducers } from 'redux';
import authenticationReducers from './shared/authenticationReducers';
import channelReducers from './channels/channelReducers';
import { reducer as formReducer } from 'redux-form';

const app = combineReducers({
    auth: authenticationReducers,
    channels: channelReducers,
    form: formReducer
});

export default app;