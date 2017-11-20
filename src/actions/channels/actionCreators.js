import * as actionTypes from '../../constants/actionTypes';

export const updateChannel = (item) => ({
    type: actionTypes.CHANNEL_UPDATE_CHANNEL,
    payload: {
        item,
    }
});

export const cancelEditingChannel = () => ({
    type: actionTypes.CHANNEL_CANCEL_EDITING_CHANNEL,
});

export const setIsBeingEdited = (payload) => ({
    type: actionTypes.SET_EDITOR_OPEN,
    payload,
});

export const addChannel = () => ({
    type: actionTypes.ADD_CHANNEL,
});

export const setNewChannelName = (payload) => ({
    type: actionTypes.SET_NEW_CHANNEL_NAME,
    payload,
});

// TOTO JE THUNK
//
// export const addChannel = () => async (dispatch, getState) => {
//     const state = getState();
//
//     await apiPutNewChannel(buildChannelData());
//
//     dispatch({type: actionTypes.ADD_CHANNEL, payload: buildChannelData()});
// };
