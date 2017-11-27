import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import { createApiUserUri ,API_AUTH_URI} from '../../constants/api';
import { push } from 'connected-react-router';

export const authenticateUser = (email) =>
    (dispatch) => {
        dispatch(startAuthentication());

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const request = axios.post(API_AUTH_URI, `"${email}"`, {headers});

        return request
            .then((token) => {
                dispatch(receiveValidToken(token));
            })
            .then(() =>
                dispatch(fetchLoggedUser(email, dispatch)))
            .catch(() => {
                dispatch(failAuthentication());
            });
    };

export const startAuthentication = () => ({
    type: actionTypes.SHARED_AUTHENTICATION_STARTED
});

export const receiveValidToken = ({data}) => ({
    type: actionTypes.SHARED_RECEIVE_TOKEN,
    payload: `Bearer ${data}`
});

export const failAuthentication = () => ({
    type: actionTypes.SHARED_LOGIN_FAILED,
    payload: 'No user is registered under submitted email.'
});

const fetchLoggedUser = (email) =>
    (dispatch) => {
        const headers = { 'Accept': 'application/json' };
        const request = axios.get(createApiUserUri(email), headers);

        return request
            .then((user) => {
                dispatch({
                    type: actionTypes.SHARED_LOGIN_SUCCESS,
                    payload: user
                });
                dispatch(push('/chat'));
            })
            .catch(() => {
                dispatch({
                    type: actionTypes.SHARED_LOGIN_FAILED,
                    payload: 'Could not login, please try again.'
                });
            });
    };

