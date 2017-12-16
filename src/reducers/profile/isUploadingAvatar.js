import {
    PROFILE_AVATAR_UPLOADING_STARTED,
    PROFILE_UPDATE_AVATAR,
} from '../../constants/actionTypes';

export const isUploadingAvatar = (prevState = false, action) => {
    switch (action.type) {
        case PROFILE_AVATAR_UPLOADING_STARTED:
            return true;

        case PROFILE_UPDATE_AVATAR:
            return false;

        default:
            return prevState;
    }
};
