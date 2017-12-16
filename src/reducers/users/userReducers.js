import {
    ADD_USER,
    SHARED_LOGIN_SUCCESS,
    UPDATE_USERS,
    PROFILE_UPDATE_DETAILS,
    PROFILE_UPDATE_AVATAR
} from '../../constants/actionTypes';
import { combineReducers } from 'redux';
import { List } from 'immutable';

export const defaultDetails = {
    email: '',
    nickname: '',
    avatarId: '',
    avatarUri: '',
    id: '',
};

export const saveLoggedUser = (prevState = defaultDetails, {type, payload}) => {
    switch (type) {
        case SHARED_LOGIN_SUCCESS:
            return payload;
        case PROFILE_UPDATE_DETAILS:
            return {...prevState, ...payload};
        case PROFILE_UPDATE_AVATAR:
            return {...prevState, avatarUri: payload.avatarUri || prevState.avatarUri};
        default:
            return prevState;
    }
};

export const saveAllUsers = (state = List(), {type, payload}) => {
    switch(type) {
        case PROFILE_UPDATE_DETAILS:
            return state.map(user => user.id === payload.id ? {...user, ...payload} : user);
        case UPDATE_USERS:
            return payload;
        case ADD_USER:
            return state.push({ ...payload });
        default:
            return state;
    }
};

export const userReducers = combineReducers({
    user: saveLoggedUser,
    all: saveAllUsers
});