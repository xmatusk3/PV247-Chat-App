import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import * as Actions from 'constants/actionTypes';

const defaultUiState = {
    isBeingEdited: false,
    newChannelName: '',
    error: ''
};

const channelUiReducer = (state = defaultUiState, {type, payload}) => {
    switch (type) {
        case Actions.SET_EDITOR_OPEN:
            return {...state, isBeingEdited: payload};
        case Actions.SET_NEW_CHANNEL_NAME:
            return {...state, newChannelName: payload};
        case Actions.SHARED_API_ERROR:
            return {...state, error: payload};
        default:
            return state;
    }
};


const channelListReducer = (state = Immutable.List(), {type, payload}) => {
    switch (type) {
        case Actions.CHANNEL_LEAVE_CHANNEL:
            return {...state,
                ownerIds: state.ownerIds.filter(owner => owner !== payload),
                userIds: state.userIds.filter(user => user !== payload)};
        case Actions.CHANNEL_DELETE_CHANNEL:
            return state.filter((item) => item.id !== payload);
        case Actions.ADD_CHANNEL:
            return state.push(payload);
        case Actions.UPDATE_CHANNELS:
            return payload;
        default:
            return state;
    }//state.ownerIds.filter(owner => owner != payload)
};

export default combineReducers({
    ui: channelUiReducer,
    channelList: channelListReducer,
});

