import {
    SHARED_AUTHENTICATION_FAILED,
    SHARED_AUTHENTICATION_STARTED,
    SHARED_RECEIVE_TOKEN,
} from '../../constants/actionTypes';
import { combineReducers } from 'redux';

const isAuthenticating = (prevState = false, action) => {
    switch (action.type) {
        case SHARED_AUTHENTICATION_STARTED:
            return true;

        case SHARED_RECEIVE_TOKEN:
        case SHARED_AUTHENTICATION_FAILED:
            return false;

        default:
            return prevState;
    }
};

const resolveAuthentication = (state = {token: '', error: ''}, action) => {
    switch (action.type) {
        case SHARED_RECEIVE_TOKEN:
            return {
                token: action.payload,
                error: ''
            };
        case SHARED_AUTHENTICATION_FAILED:
            return {
                token: '',
                error: action.payload
            };
        default:
            return state;
    }
};

export default combineReducers({
    isAuthenticating,
    authResult: resolveAuthentication
});
