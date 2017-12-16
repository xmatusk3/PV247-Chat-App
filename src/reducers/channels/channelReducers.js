import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import {
    CHANNEL_CANCEL_EDITING_CHANNEL,
    CHANNEL_OPEN_EDITING_CHANNEL,
    SET_ADD_CHANNEL_OPEN,
    CHANNEL_CANCEL_INVITING,
    CHANNEL_OPEN_INVITING,
    OPEN_EDIT_PROFILE,
    CHANNEL_OPEN_CHANNEL,
    SHARED_API_ERROR,
    CHANNEL_OPEN_CHANNEL_CLOSE,
    CHANNEL_LEAVE_CHANNEL,
    CHANNEL_DELETE_CHANNEL,
    ADD_CHANNEL,
    UPDATE_CHANNELS,
    CHANNEL_UPDATE_CHANNEL,
    CHANNEL_UPDATE_EDITED_CHANNEL,
    MESSAGE_ADD_MESSAGE,
    MESSAGE_EDIT_MESSAGE,
    CHANNEL_LOAD_MESSAGES,
    MESSAGE_DELETE_MESSAGE,
    CHANNEL_UPDATE_OPENED_CHANNEL
} from '../../constants/actionTypes';

export const defaultUiState = {
    isBeingAdded: false,
    isBeingEdited: false,
    profileIsOpened: false,
    isBeingInvited: false,
    isBeingOpened: false,
    newChannelName: '',
    error: '',
};

export const channelUiReducer = (state = defaultUiState, {type, payload}) => {
    switch (type) {
        case CHANNEL_CANCEL_EDITING_CHANNEL:
        case CHANNEL_OPEN_EDITING_CHANNEL:
            return {...state, isBeingEdited: payload.open, isBeingOpened: false, isBeingAdded: false, isBeingInvited: false, profileIsOpened: false};
        case SET_ADD_CHANNEL_OPEN:
            return {...state, isBeingAdded: payload, isBeingOpened: false, isBeingEdited: false, isBeingInvited: false, profileIsOpened: false};
        case CHANNEL_CANCEL_INVITING:
        case CHANNEL_OPEN_INVITING:
            return {...state, isBeingInvited: payload.open, isBeingEdited: false, isBeingAdded: false, profileIsOpened: false, isBeingOpened: false};
        case OPEN_EDIT_PROFILE:
            return {...state, isBeingOpened: false, isBeingAdded: false, isBeingEdited: false, isBeingInvited: false, profileIsOpened: payload };
        case CHANNEL_OPEN_CHANNEL:
            return {...state,  isBeingOpened: true, profileIsOpened: false, isBeingInvited: false, isBeingEdited: false, isBeingAdded: false};
        case SHARED_API_ERROR:
            return {...state, error: payload};
        case CHANNEL_OPEN_CHANNEL_CLOSE:
            return {...state, isBeingOpened: false};
        default:
            return state;
    }
};


export const channelListReducer = (state = Immutable.List(), {type, payload}) => {
    switch (type) {
        case CHANNEL_LEAVE_CHANNEL:
        case CHANNEL_DELETE_CHANNEL:
            return state.filter((item) => item.id !== payload);
        case ADD_CHANNEL:
            return state.push(payload);
        case UPDATE_CHANNELS:
            return payload;
        case CHANNEL_UPDATE_CHANNEL:
            return state.map(item => (item.id === payload.id) ? {...payload} : item);
        case CHANNEL_CANCEL_EDITING_CHANNEL:
            return state.map(item => (item.id === payload.channel.id) ? payload.channel : item);
        default:
            return state;
    }
};

export const editedChannelReducer = (state = null, {type, payload}) => {
    switch (type) {
        case CHANNEL_OPEN_INVITING:
        case CHANNEL_OPEN_EDITING_CHANNEL:
        case CHANNEL_UPDATE_EDITED_CHANNEL:
            return {...payload.channel || payload};
        case CHANNEL_OPEN_CHANNEL:
        case CHANNEL_CANCEL_INVITING:
        case CHANNEL_CANCEL_EDITING_CHANNEL:
        case SET_ADD_CHANNEL_OPEN:
            return null;
        default:
            return state;
    }
};

export const openedChannelReducer = (state = {channel: null, messages: Immutable.List()}, {type, payload}) => {
    switch(type) {
        case CHANNEL_OPEN_CHANNEL:
            return {...state, channel: payload };
        case MESSAGE_ADD_MESSAGE:
            return {...state, messages: state.messages.insert(0, payload)};
        case MESSAGE_EDIT_MESSAGE:
            return {...state, messages: state.messages.map(m => (m.id === payload.id) ? {...m, ...payload} : m)};
        case CHANNEL_LOAD_MESSAGES:
            return {...state, messages: Immutable.List(payload)};
        case MESSAGE_DELETE_MESSAGE:
            return {...state, messages: state.messages.filter(m => m.id !== payload)};

        case CHANNEL_OPEN_EDITING_CHANNEL:
        case SET_ADD_CHANNEL_OPEN:
        case CHANNEL_OPEN_INVITING:
            return { channel: null, messages: Immutable.List() };

        case CHANNEL_UPDATE_OPENED_CHANNEL:
            return {...payload};
        case CHANNEL_OPEN_CHANNEL_CLOSE:
            return {channel: null, messages: Immutable.List()};
        default:
            return state;
    }
};

export const channelReducers = combineReducers({
    ui: channelUiReducer,
    channelList: channelListReducer,
    editedChannel: editedChannelReducer,
    openedChannel: openedChannelReducer
});

