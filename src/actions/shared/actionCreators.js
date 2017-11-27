import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import {API_AUTH_URI} from '../../constants/api';
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
                dispatch(push('/chat'));
            })
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
    type: actionTypes.SHARED_AUTHENTICATION_FAILED,
    payload: 'No user is registered under submitted email.'
});