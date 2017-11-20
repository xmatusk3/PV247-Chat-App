import {
    CHANNEL_OPEN_EDITOR,
    CHANNEL_CLOSE_EDITOR
} from '../../constants/actionTypes';

export const openChannelEditor = (prevState = false, action) => {
    switch(action.type) {
        case CHANNEL_OPEN_EDITOR:
            return true;
        case CHANNEL_CLOSE_EDITOR:
            return false;

        default:
            return false;
    }
};