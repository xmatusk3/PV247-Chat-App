import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_APP_URI,
    API_USER_ALL
} from '../../constants/api';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';
import parseChannelResponse from '../../utils/api/parseChannelResponse';
import { uuid } from '../../utils/uuidGenerator';

export const sendInvite = (newEmail, userEmail) =>
    (dispatch) => {
        const requestData = {
            'email': newEmail,
            'customData':  uuid()
        };

        const request = fetchAuthToken(userEmail).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json-patch+json'
            };

            return axios.post(API_USER_ALL, JSON.stringify(requestData), { headers });
        });

        request
            .then(( {data} ) => {
                dispatch({
                    type: actionTypes.ADD_USER,
                    payload: data
                });
            })
            .catch(() => {
                dispatch(serverError);
            });
    };

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

export const startInviteUsers = (channel) => ({
    type: actionTypes.CHANNEL_OPEN_INVITING,
    payload: {open: true, channel}
});

export const removeUserUI = (channel) => ({
    type: actionTypes.CHANNEL_UPDATE_EDITED_CHANNEL,
    payload: channel
});

export const openChannel = (channelId) => ({
    type: actionTypes.CHANNEL_OPEN_CHANNEL,
    payload: channelId
});

export const cancelEditing = (channel, usersToPromote, usersToKick) => {
    channel.userIds = channel.userIds.union(usersToPromote).union(usersToKick);

    return {
        type: actionTypes.CHANNEL_CANCEL_EDITING_CHANNEL,
        payload: {
            open: false,
            channel
        }
    };
};

export const cancelInviting = () => ({
    type: actionTypes.CHANNEL_CANCEL_INVITING,
    payload: { open: false }
});

export const editChannel = (channel, userEmail) =>
    (dispatch) => {
        const newCustomData = {
            ownerIds: channel.ownerIds.toArray(),
            userIds: channel.userIds.toArray()
        };

        const requestData = [{
            'path': `/channels/${channel.id}`,
            'op': 'replace',
            'value': {
                'id': channel.id,
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
                dispatch({
                    type: actionTypes.CHANNEL_UPDATE_EDITED_CHANNEL,
                    payload: channel
                });
            })
            .catch(() => dispatch(serverError));
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
        const newOwners = ownerIds.remove(userEmail).toArray();
        const newUsers = userIds.remove(userEmail).toArray();

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


