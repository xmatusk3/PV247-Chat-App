import * as actionTypes from '../../constants/actionTypes';
//import { errorActionFactory } from '../../utils/errorActionFactory';

export const receiveValidToken = (token) => ({
    type: actionTypes.SHARED_RECEIVE_TOKEN,
    payload: {
        token,
    }
});

export const invalidateToken = () => ({
    type: actionTypes.SHARED_INVALIDATE_TOKEN,
});

export const startAuthentication = () => ({
    type: actionTypes.SHARED_AUTHENTICATION_STARTED,
});

/*export const dismissError = (errorId) => ({
    type: actionTypes.SHARED_DISMISS_ERROR,
    payload: {
        errorId,
    }
});*/

//export const failAuthentication = errorActionFactory(actionTypes.SHARED_AUTHENTICATION_FAILED);
