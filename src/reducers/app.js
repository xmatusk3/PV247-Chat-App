import { combineReducers } from 'redux';
import authenticationReducers from './shared/authenticationReducers';
import channelReducers from './channels/channelReducers';
import userReducers from './users/userReducers';
import { reducer as formReducer } from 'redux-form';

const app = combineReducers({
    auth: authenticationReducers,
    channels: channelReducers,
    users: userReducers,
    form: formReducer
});

export default app;