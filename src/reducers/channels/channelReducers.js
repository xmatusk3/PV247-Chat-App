import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import * as Actions from 'constants/actionTypes';

const defaultUiState = {
    isBeingEdited: false,
    newChannelName: '',
};

const channelUiReducer = (state = defaultUiState, {type, payload}) => {
    switch (type) {
        case Actions.SET_EDITOR_OPEN:
            return {...state, isBeingEdited: payload};

        case Actions.SET_NEW_CHANNEL_NAME:
            return {...state, newChannelName: payload};
        default:
            return state;
    }
};


const channelListReducer = (state = Immutable.List(), {type}) => {
    switch (type) {
        default:
            return state;
    }
};

export default combineReducers({
    ui: channelUiReducer,
    channelList: channelListReducer,
});

