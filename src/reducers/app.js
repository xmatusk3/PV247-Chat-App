import { combineReducers } from 'redux';
import { AuthReducers } from './authentication/authenticationReducers';
import { channelReducers } from './channels/channelReducers';
import { userReducers } from './users/userReducers';
import { profile } from './profile/profile';
import { reducer as formReducer } from 'redux-form';

const app = combineReducers({
    auth: AuthReducers,
    channels: channelReducers,
    users: userReducers,
    form: formReducer,
    profile: profile
});

export default app;