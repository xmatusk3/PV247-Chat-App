import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import { fetchApiUserUri ,API_AUTH_URI} from '../../constants/api';
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
                dispatch(fetchLoggedUser(email, token));
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
    type: actionTypes.SHARED_LOGIN_FAILED,
    payload: 'No user is registered under submitted email.'
});

const fetchLoggedUser = (email, {data}) =>
    (dispatch) => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${data}`
        };
        const request = axios.get(fetchApiUserUri(email), {headers});

        return request
            .then((data) => {
                dispatch({
                    type: actionTypes.SHARED_LOGIN_SUCCESS,
                    payload: data.data
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

