import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import {List} from 'immutable';
import {
    fetchApiUserUri,
    API_AUTH_URI,
    API_USER_ALL,
    API_APP_URI
} from '../../constants/api';
import { push } from 'connected-react-router';
import parseChannelResponse from '../../utils/api/parseChannelResponse';
import { parseUser } from '../../utils/api/parseUserResponse';
import { getUserData } from '../profile/actionCreators';

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
                dispatch(fetchAllUsers(token));
                dispatch(fetchAllChannels(token));
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
            .then(({data}) => {
                const details = getUserData(data).customData;
                dispatch(saveLoggedUser(details, email));
                dispatch(push('/chat'));
            })
            .catch(() => {
                dispatch(serverLoginError);
            });
    };

export const saveLoggedUser = (details, email) => ({
    type: actionTypes.SHARED_LOGIN_SUCCESS,
    payload: {...details, email: email}
});

const fetchAllUsers = ({data}) =>
    (dispatch) => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${data}`
        };
        const request = axios.get(API_USER_ALL, {headers});

        return request
            .then((response) =>
                dispatch({
                    type: actionTypes.UPDATE_USERS,
                    payload: List(response.data.map(user => ({...parseUser(user)})))
                }))
            .catch((response) => {
                dispatch(serverLoginError);
                throw new Error(response);
            });
    };

const fetchAllChannels = ({data}) =>
    (dispatch) => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${data}`
        };

        const request = axios.get(API_APP_URI, {headers});

        return request
            .then(({data: {channels}}) => {
                let parsedChannels = List();

                for (const channel of channels) {
                    parsedChannels = parsedChannels.push(parseChannelResponse(channel));
                }
                return dispatch({
                    type: actionTypes.UPDATE_CHANNELS,
                    payload: parsedChannels
                });
            })
            .catch((response) => {
                dispatch(serverLoginError);
                throw new Error(response);
            });
    };

const serverLoginError = () => ({
    type: actionTypes.SHARED_LOGIN_FAILED,
    payload: 'Could not load all the data from server. Please try again later.'
});

export const serverError = () => ({
    type: actionTypes.SHARED_API_ERROR,
    payload: 'Server error, please try again later.'
});
