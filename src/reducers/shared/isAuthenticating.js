import {
    SHARED_AUTHENTICATION_FAILED,
    SHARED_AUTHENTICATION_STARTED,
    SHARED_RECEIVE_TOKEN,
} from '../../constants/actionTypes';

export const isAuthenticating = (prevState = false, action) => {
    switch (action.type) {
        case SHARED_AUTHENTICATION_STARTED:
            return true;

        case SHARED_RECEIVE_TOKEN:
        case SHARED_AUTHENTICATION_FAILED:
            return false;

        default:
            return prevState;
    }
};
