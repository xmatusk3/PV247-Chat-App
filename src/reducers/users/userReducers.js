import { SHARED_LOGIN_SUCCESS, UPDATE_USERS } from '../../constants/actionTypes';
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
        default:
            return state;
    }
};

export default combineReducers({
    user: saveLoggedUser,
    all: saveAllUsers
});