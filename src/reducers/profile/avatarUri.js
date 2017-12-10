import { PROFILE_UPDATE_AVATAR } from '../../constants/actionTypes';

export const avatarUri = (prevState = null, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_AVATAR:
            return action.payload.avatarUri;

        default:
            return prevState;
    }
};
