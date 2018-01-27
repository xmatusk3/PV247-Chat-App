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

export const authenticateUserFactory = (dependencies) =>
    (email) =>
        (dispatch) => {
            dispatch(startAuthentication());

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            const request = dependencies.makePostRequest(API_AUTH_URI, `"${email}"`, {headers});

            return request
                .then((token) => {
                    dispatch(receiveValidToken(token));
                    dispatch(dependencies.fetchLoggedUser(email, token));
                    dispatch(dependencies.fetchAllUsers(token));
                    dispatch(dependencies.fetchAllChannels(token));
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

export const fetchLoggedUserFactory = (dependencies) =>
    (email, token) =>
        (dispatch) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`
            };
            const request = dependencies.makeGetRequest(fetchApiUserUri(email), {headers});

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

export const updateUsers = (userList) => ({
    type: actionTypes.UPDATE_USERS,
    payload: userList
});

export const updateChannels = (channels) => ({
    type: actionTypes.UPDATE_CHANNELS,
    payload: channels
});

export const serverLoginError = () => ({
    type: actionTypes.SHARED_LOGIN_FAILED,
    payload: 'Could not load all the data from server. Please try again later.'
});

export const serverError = () => ({
    type: actionTypes.SHARED_API_ERROR,
    payload: 'Server error, please try again later.'
});

export const fetchAllChannelsFactory = (dependencies) =>
    ({data}) =>
        (dispatch) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${data}`
            };

            const request = dependencies.makeGetRequest(API_APP_URI, {headers});

            return request
                .then(({data: {channels}}) => {
                    let parsedChannels = List();

                    for (const channel of channels) {
                        parsedChannels = parsedChannels.push(parseChannelResponse(channel));
                    }
                    return dispatch(updateChannels(parsedChannels));
                })
                .catch((response) => {
                    dispatch(serverLoginError);
                    throw new Error(response);
                });
        };

export const fetchAllUsersFactory = (dependencies) =>
    ({data}) =>
        (dispatch) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${data}`
            };
            dependencies.makeGetRequest(API_USER_ALL, {headers})
                .then((response) => {
                    const userList = List(response.data.map(user => ({...parseUser(user)})));
                    return dispatch(updateUsers(userList));
                })
                .catch((response) => {
                    dispatch(serverLoginError);
                    throw new Error(response);
                });
        };
export const fetchLoggedUser = fetchLoggedUserFactory({ makeGetRequest: axios.get });
export const fetchAllChannels = fetchAllChannelsFactory({ makeGetRequest: axios.get });
export const fetchAllUsers = fetchAllUsersFactory({ makeGetRequest: axios.get });
export const authenticateUser = authenticateUserFactory({
    makePostRequest: axios.post,
    fetchLoggedUser: fetchLoggedUser,
    fetchAllUsers: fetchAllUsers,
    fetchAllChannels: fetchAllChannels
});

