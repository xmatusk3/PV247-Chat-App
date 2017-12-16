import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import * as Actions from 'constants/actionTypes';

const defaultUiState = {
    isBeingAdded: false,
    isBeingEdited: false,
    profileIsOpened: false,
    isBeingInvited: false,
    isBeingOpened: false,
    newChannelName: '',
    error: '',
};

const channelUiReducer = (state = defaultUiState, {type, payload}) => {
    switch (type) {
        case Actions.CHANNEL_CANCEL_EDITING_CHANNEL:
        case Actions.CHANNEL_OPEN_EDITING_CHANNEL:
            return {...state, isBeingEdited: payload.open, isBeingOpened: false, isBeingAdded: false, isBeingInvited: false, profileIsOpened: false};
        case Actions.SET_ADD_CHANNEL_OPEN:
            return {...state, isBeingAdded: payload, isBeingOpened: false, isBeingEdited: false, isBeingInvited: false, profileIsOpened: false};
        case Actions.CHANNEL_CANCEL_INVITING:
        case Actions.CHANNEL_OPEN_INVITING:
            return {...state, isBeingInvited: payload.open, isBeingEdited: false, isBeingAdded: false, profileIsOpened: false, isBeingOpened: false};
        case Actions.OPEN_EDIT_PROFILE:
            return {...state, isBeingOpened: false, isBeingAdded: false, isBeingEdited: false, isBeingInvited: false, profileIsOpened: payload };
        case Actions.CHANNEL_OPEN_CHANNEL:
            return {...state,  isBeingOpened: true, profileIsOpened: false, isBeingInvited: false, isBeingEdited: false, isBeingAdded: false};
        case Actions.SET_NEW_CHANNEL_NAME:
            return {...state, newChannelName: payload};
        case Actions.SHARED_API_ERROR:
            return {...state, error: payload};
        case Actions.CHANNEL_OPEN_CHANNEL_CLOSE:
            return {...state, isBeingOpened: false};
        default:
            return state;
    }
};


const channelListReducer = (state = Immutable.List(), {type, payload}) => {
    switch (type) {
        case Actions.CHANNEL_LEAVE_CHANNEL:
        case Actions.CHANNEL_DELETE_CHANNEL:
            return state.filter((item) => item.id !== payload);
        case Actions.ADD_CHANNEL:
            return state.push(payload);
        case Actions.UPDATE_CHANNELS:
            return payload;
        case Actions.CHANNEL_UPDATE_CHANNEL:
            return state.map(item => (item.id === payload.id) ? {...payload} : item);
        case Actions.CHANNEL_CANCEL_EDITING_CHANNEL:
            return state.map(item => (item.id === payload.channel.id) ? payload.channel : item);
        default:
            return state;
    }
};

const editedChannelReducer = (state = null, {type, payload}) => {
    switch (type) {
        case Actions.CHANNEL_OPEN_INVITING:
        case Actions.CHANNEL_OPEN_EDITING_CHANNEL:
        case Actions.CHANNEL_UPDATE_EDITED_CHANNEL:
            return {...payload.channel || payload};
        case Actions.CHANNEL_OPEN_CHANNEL:
        case Actions.CHANNEL_CANCEL_INVITING:
        case Actions.CHANNEL_CANCEL_EDITING_CHANNEL:
        case Actions.SET_ADD_CHANNEL_OPEN:
            return null;
        default:
            return state;
    }
};

const openedChannelReducer = (state = {channel: null, messages: Immutable.List()}, {type, payload}) => {
    switch(type) {
        case Actions.CHANNEL_OPEN_CHANNEL:
            return {...state, channel: payload };
        case Actions.MESSAGE_ADD_MESSAGE:
            return {...state, messages: state.messages.insert(0, payload)};
        case Actions.MESSAGE_EDIT_MESSAGE:
            return {...state, messages: state.messages.map(m => (m.id === payload.id) ? {...m, ...payload} : m)};
        case Actions.CHANNEL_LOAD_MESSAGES:
            return {...state, messages: Immutable.List(payload)};
        case Actions.MESSAGE_DELETE_MESSAGE:
            return {...state, messages: state.messages.filter(m => m.id !== payload)};

        case Actions.CHANNEL_OPEN_EDITING_CHANNEL:
        case Actions.SET_ADD_CHANNEL_OPEN:
        case Actions.CHANNEL_OPEN_INVITING:
            return { channel: null, messages: Immutable.List() };

        case Actions.CHANNEL_UPDATE_OPENED_CHANNEL:
            return {...payload};
        case Actions.CHANNEL_OPEN_CHANNEL_CLOSE:
            return {channel: null, messages: Immutable.List()};
        default:
            return state;
    }
};

export default combineReducers({
    ui: channelUiReducer,
    channelList: channelListReducer,
    editedChannel: editedChannelReducer,
    openedChannel: openedChannelReducer
});

