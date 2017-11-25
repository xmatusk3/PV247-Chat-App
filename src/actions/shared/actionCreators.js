import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import {API_AUTH_URI} from '../../constants/api';
import { push } from 'connected-react-router';

export const receiveValidToken = (token) => ({
    type: actionTypes.SHARED_RECEIVE_TOKEN,
    payload: {
        token,
    }
});

export const invalidateToken = () => ({
    type: actionTypes.SHARED_INVALIDATE_TOKEN,
});

export const authenticateUser = (email) =>
    (dispatch) => {
        dispatch(startAuthentication());

        //eslint-disable-next-line
        console.log('I am inside authenticateUser action creator, I have received value: ', email);

        const request = axios.post(API_AUTH_URI, email);

        return request
            .then((token) => {
                dispatch(receiveValidToken(token));
                dispatch(push('/chat'));
            })
            .catch((/*error*/) => {
                // const dispatchedAction = dispatch(failAuthentication(FAILED_AUTHENTICATION_MESSAGE, error));
                // setTimeout(() => dispatch(dismissError(dispatchedAction.payload.error.id)), MILISECONDS_TO_AUTO_DISMISS_ERROR);
            });
    };

export const startAuthentication = () => ({
    type: actionTypes.SHARED_AUTHENTICATION_STARTED
});


export const failAuthentication = () => ({
    type: actionTypes.SHARED_AUTHENTICATION_FAILED
});


/*export const dismissError = (errorId) => ({
    type: actionTypes.SHARED_DISMISS_ERROR,
    payload: {
        errorId,
    }
});*/

//export const failAuthentication = errorActionFactory(actionTypes.SHARED_AUTHENTICATION_FAILED);
