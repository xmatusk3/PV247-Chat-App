import {
    SHARED_LOGIN_FAILED,
    SHARED_AUTHENTICATION_STARTED,
    SHARED_RECEIVE_TOKEN,
    SHARED_LOGIN_SUCCESS,
} from '../../constants/actionTypes';
import { combineReducers } from 'redux';

const isAuthenticating = (prevState = false, action) => {
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

const resolveAuthentication = (state = {token: '', error: ''}, action) => {
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

const saveLoggedUser = (state = {}, action) => {
    switch (action.type) {
        case SHARED_LOGIN_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    isAuthenticating,
    authResult: resolveAuthentication,
    user: saveLoggedUser
});
