import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import * as Actions from 'constants/actionTypes';

// import { editedChannelId } from './editedChannel';
// import { openChannelEditor } from './openChannelEditor';

const defaultUiState = {
    isBeingEdited: false,
    newChannelName: '',
};

const channelUiReducer = (state = defaultUiState, {type, payload}) => {
    switch (type) {
        case Actions.SET_EDITOR_OPEN:
            console.log(111, payload); // eslint-disable-line no-console

            return {...state, isBeingEdited: payload};

        case Actions.SET_NEW_CHANNEL_NAME:
            console.log(222, payload); // eslint-disable-line no-console

            return {...state, newChannelName: payload};

        default:
            return state;
    }
};


const defaultChannelListState = Immutable.List();

const channelListReducer = (state = defaultChannelListState, {type}) => {
    switch (type) {
        default:
            return state;
    }
};

export const channelReducers = combineReducers({
    //editedChannelId,
    // openChannelEditor
    ui: channelUiReducer,
    channelList: channelListReducer,
});

