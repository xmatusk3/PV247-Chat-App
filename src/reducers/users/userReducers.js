import {
    ADD_USER,
    SHARED_LOGIN_SUCCESS,
    UPDATE_USERS,
    PROFILE_UPDATE_DETAILS
} from '../../constants/actionTypes';
import { combineReducers } from 'redux';
import { List } from 'immutable';

export const defaultDetails = {
    email: '',
    nickname: '',
    avatarId: '',
    id: '',
};

const saveLoggedUser = (prevState = defaultDetails, {type, payload}) => {
    switch (type) {
        case SHARED_LOGIN_SUCCESS:
            return payload;
        case PROFILE_UPDATE_DETAILS:
            return {...prevState,
                email: payload.email || prevState.email,
                nickname: payload.nickname || prevState.nickname,
                avatarId: payload.avatarId || prevState.avatarId,
                id: payload.id || prevState.id,
            };
        default:
            return prevState;
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