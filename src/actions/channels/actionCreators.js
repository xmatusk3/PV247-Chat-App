import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_APP_URI,
} from '../../constants/api';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';
import parseChannelResponse from '../../utils/api/parseChannelResponse';

export const updateChannel = (item) => ({
    type: actionTypes.CHANNEL_UPDATE_CHANNEL,
    payload: {
        item,
    }
});

export const closeAddChannel = () => ({
    type: actionTypes.SET_EDITOR_OPEN,
    payload: false
});

export const setIsBeingEdited = (payload) => ({
    type: actionTypes.SET_EDITOR_OPEN,
    payload,
});

export const addNewChannel = (data, userEmail) =>
    (dispatch) => {
        const userEmails = [];

        for (const user of data.users) {
            userEmails.push(`${user}`);
        }

        const customData = {
            ownerIds: [userEmail],
            userIds: userEmails
        };

        const requestData = [{
            'path': '/channels/-',
            'op': 'add',
            'value': {
                'name': data.channelName,
                'customData': JSON.stringify(customData)
            }
        }];

        const request = fetchAuthToken(userEmail).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json-patch+json'
            };

            return axios.patch(API_APP_URI, requestData, { headers });
        });

        return request
            .then((response) => {
                dispatch({
                    type: actionTypes.ADD_CHANNEL,
                    payload: parseChannelResponse(response.data['channels'][response.data['channels'].length - 1])
                });
                dispatch({
                    type: actionTypes.SET_EDITOR_OPEN,
                    payload: false
                });
            })
            .catch(() => {
                dispatch(serverError);
            });

    };

export const deleteChannel = (channelId, userEmail) =>
    (dispatch) => {
        const requestData = [{
            'path': `/channels/${channelId}`,
            'op': 'remove'
        }];

        const request = fetchAuthToken(userEmail).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json-patch+json'
            };

            return axios.patch(API_APP_URI, requestData, { headers });
        });

        return request
            .then(() => {
                dispatch({
                    type: actionTypes.CHANNEL_DELETE_CHANNEL,
                    payload: channelId,
                });
            })
            .catch(() => {
                dispatch(serverError);
            });

    };


export const leaveChannel = ({id, name, ownerIds, userIds}, userEmail) =>
    (dispatch) => {
        const customData = `{"ownerIds": "[${(ownerIds.filter(owner => owner !== userEmail)).toArray()}]",
                            "userIds": "[${(userIds.filter(user => user !== userEmail).toArray())}]"}`;

        //eslint-disable-next-line
        console.log(customData);
        const requestData = [{
            'path': `/channels/${id}`,
            'op': 'replace',
            'value': {
                'id': id,
                'name': name,
                'customData': customData
            }
        }];

        const request = fetchAuthToken(userEmail).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json-patch+json'
            };

            return axios.patch(API_APP_URI, requestData, {headers});
        });

        return request
            .then(() => {
                dispatch({
                    type: actionTypes.CHANNEL_LEAVE_CHANNEL,
                    payload: userEmail
                });
            })
            .catch(() => {
                dispatch(serverError);
            });
    };

const serverError = () => ({
    type: actionTypes.SHARED_API_ERROR,
    payload: 'Server error, please try again later.'
});