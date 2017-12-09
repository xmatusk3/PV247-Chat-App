import {
    ADD_USER,
    SHARED_LOGIN_SUCCESS,
    UPDATE_USERS
} from '../../constants/actionTypes';
import { combineReducers } from 'redux';
import { List } from 'immutable';

const saveLoggedUser = (state = {email: '', customData: ''}, action) => {
    switch (action.type) {
        case SHARED_LOGIN_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const saveAllUsers = (state = List(), {type, payload}) => {
    switch(type) {
        case UPDATE_USERS:
            return payload;
        case ADD_USER:
            return state.push({ email: payload.email, customData: payload.customData });
        default:
            return state;
    }
};

export default combineReducers({
    user: saveLoggedUser,
    all: saveAllUsers
});