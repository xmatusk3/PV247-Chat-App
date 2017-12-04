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
    type: actionTypes.SET_ADD_CHANNEL_OPEN,
    payload: false
});

export const setIsBeingCreated = (payload) => ({
    type: actionTypes.SET_ADD_CHANNEL_OPEN,
    payload,
});

export const startEditChannel = (channel) => ({
    type: actionTypes.CHANNEL_OPEN_EDITING_CHANNEL,
    payload: {open: true, channel},
});

export const cancelEditing = () => ({
    type: actionTypes.CHANNEL_CANCEL_EDITING_CHANNEL,
    payload: {open: false, channel: null}
});

export const editChannel = (channel, userEmail) =>
    (dispatch) => {
        const newCustomData = {
            ownerIds: channel.ownerIds,
            userIds: channel.userIds
        };

        const requestData = [{
            'path': `/channels/${channel.id}`,
            'op': 'replace',
            'value': {
                'name': channel.name,
                'customData': JSON.stringify(newCustomData)
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
            .then(() => {
                dispatch({
                    type: actionTypes.CHANNEL_UPDATE_CHANNEL,
                    payload: channel
                });
            })
            .catch(() => {
                dispatch(serverError);
            });
    };



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
                    type: actionTypes.SET_ADD_CHANNEL_OPEN,
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
        const newOwners = ownerIds.filter(owner => owner !== userEmail).toArray();
        const newUsers = userIds.filter(user => user !== userEmail).toArray();

        const customData = {ownerIds: newOwners, userIds: newUsers};

        const requestData = [{
            'path': `/channels/${id}`,
            'op': 'replace',
            'value': {
                'id': id,
                'name': name,
                'customData': JSON.stringify(customData)
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
                    payload: id
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