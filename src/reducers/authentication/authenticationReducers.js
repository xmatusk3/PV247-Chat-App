import {
    SHARED_LOGIN_FAILED,
    SHARED_AUTHENTICATION_STARTED,
    SHARED_RECEIVE_TOKEN,
} from '../../constants/actionTypes';
import { combineReducers } from 'redux';

export const isAuthenticating = (prevState = false, action) => {
    switch (action.type) {
        case SHARED_AUTHENTICATION_STARTED:
            return true;

        case SHARED_RECEIVE_TOKEN:
        case SHARED_LOGIN_FAILED:
            return false;

        default:
            return prevState;
    }
};

export const resolveAuthentication = (state = {token: '', error: ''}, action) => {
    switch (action.type) {
        case SHARED_RECEIVE_TOKEN:
            return {
                token: action.payload,
                error: ''
            };
        case SHARED_LOGIN_FAILED:
            return {
                token: '',
                error: action.payload
            };
        default:
            return state;
    }
};

export const AuthReducers = combineReducers({
    isAuthenticating,
    authResult: resolveAuthentication,
});
