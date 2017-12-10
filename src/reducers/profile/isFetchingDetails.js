import {
    PROFILE_FETCHING_STARTED,
    PROFILE_UPDATE_DETAILS,
} from '../../constants/actionTypes';

export const isFetchingDetails = (prevState = false, action) => {
    switch (action.type) {
        case PROFILE_FETCHING_STARTED:
            return true;

        case PROFILE_UPDATE_DETAILS:
            return false;

        default:
            return prevState;
    }
};
