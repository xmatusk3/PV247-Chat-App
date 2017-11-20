import {
    CHANNEL_START_EDITING_CHANNEL,
    CHANNEL_CANCEL_EDITING_CHANNEL,
    CHANNEL_UPDATE_CHANNEL,
    CHANNEL_DELETE_CHANNEL
} from '../../constants/actionTypes';

export const editedChannelId = (prevState = null, action) => {
    switch(action.type) {
        case CHANNEL_START_EDITING_CHANNEL:
            return action.payload.id;

        case CHANNEL_CANCEL_EDITING_CHANNEL:
        case CHANNEL_UPDATE_CHANNEL:
        case CHANNEL_DELETE_CHANNEL:
            return null;

        default:
            return null;
    }
};
