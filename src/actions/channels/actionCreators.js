import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_APP_URI,
    API_MESSAGE,
    API_USER_ALL
} from '../../constants/api';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';
import parseChannelResponse from '../../utils/api/parseChannelResponse';
import { serverError } from '../authentication/actionCreators';
import { uuid } from '../../utils/uuidGenerator';
import parseMessageResponse from '../../utils/api/parseMessageResponse';
import { parseUser }  from '../../utils/api/parseUserResponse';

export const sendInviteFactory = (dependencies) =>
    (newEmail, userEmail) =>
        (dispatch) => {
            const requestData = {
                'email': newEmail,
                'customData':  JSON.stringify({
                    id: uuid(),
                    avatarId: '',
                    nickname: '',
                    avatarUri: ''
                })
            };

            const request = fetchAuthToken(userEmail).then((token) => {
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.data}`,
                    'Content-Type': 'application/json-patch+json'
                };

                return dependencies.makePostRequest(API_USER_ALL, requestData, { headers });
            });

            return request
                .then(({data}) => dispatch(addUser(parseUser(data))))
                .catch(() => dispatch(serverError));
        };

export const addUser = (user) => ({
    type: actionTypes.ADD_USER,
    payload: user
});

export const closeAddChannel = () => ({
    type: actionTypes.SET_ADD_CHANNEL_OPEN,
    payload: false
});

export const setIsBeingCreated = (payload) => ({
    type: actionTypes.SET_ADD_CHANNEL_OPEN,
    payload,
});

export const setProfileIsOpened = () => ({
    type: actionTypes.OPEN_EDIT_PROFILE,
    payload: true,
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

export const cancelEditing = (channel, usersToPromote, usersToKick) => {
    channel.userIds = channel.userIds.union(usersToPromote).union(usersToKick);

    return cancelEditingUi({
        open: false,
        channel
    });
};

export const cancelEditingUi = (payload) => ({
    type: actionTypes.CHANNEL_CANCEL_EDITING_CHANNEL,
    payload
});

export const openChannelUi = (channel) => ({
    type: actionTypes.CHANNEL_OPEN_CHANNEL,
    payload: channel
});

export const openChannel = (channel) =>
    (dispatch) => {
        dispatch(openChannelUi(channel));
        dispatch(fetchMessages(channel.id));
    };

export const fetchMessagesFactory = (dependencies) =>
    (channelId = null) =>
        (dispatch, getState) => {
            const state = getState();
            const { users: {user} } = state;
            const openedChannelId = channelId || state.channels.openedChannel.channel.id;

            const request =
                fetchAuthToken(user.email)
                    .then((token) => {
                        const headers = {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token.data}`,
                        };

                        return dependencies.makeGetRequest(API_MESSAGE(openedChannelId), { headers });
                    });

            return request
                .then(({data}) => {
                    dispatch(loadMessagesUi(data.map(message => (parseMessageResponse(message)))));
                })
                .catch(() => {
                    dispatch(serverError());
                    dispatch(closeChannelUi());
                });
        };

export const loadMessagesUi = (payload) => ({
    type: actionTypes.CHANNEL_LOAD_MESSAGES,
    payload
});

export const closeChannelUi = () => ({
    type: actionTypes.CHANNEL_OPEN_CHANNEL_CLOSE,
});

export const cancelInviting = () => ({
    type: actionTypes.CHANNEL_CANCEL_INVITING,
    payload: { open: false }
});

export const editChannelFactory = (dependencies) =>
    (channel, userEmail) =>
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

                return dependencies.makePatchRequest(API_APP_URI, requestData, { headers });
            });

            return request
                .then(() => {
                    dispatch(updateChannel(channel));
                    dispatch(updateEditedChannel(channel));
                })
                .catch(() => dispatch(serverError));
        };

export const updateEditedChannel = (channel) => ({
    type: actionTypes.CHANNEL_UPDATE_EDITED_CHANNEL,
    payload: channel
});

export const updateChannel = (channel) => ({
    type: actionTypes.CHANNEL_UPDATE_CHANNEL,
    payload: channel
});



export const addNewChannelFactory = (dependencies) =>
    (data, userEmail) =>
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

                return dependencies.makePatchRequest(API_APP_URI, requestData, { headers });
            });

            return request
                .then((response) => {
                    dispatch(
                        addChannelUi(parseChannelResponse(response.data['channels'][response.data['channels'].length - 1])));
                    dispatch(openAddChannelUi(false));
                })
                .catch(() => {
                    dispatch(serverError);
                });

        };

export const openAddChannelUi = (payload) => ({
    type: actionTypes.SET_ADD_CHANNEL_OPEN,
    payload
});

export const addChannelUi = (channel) => ({
    type: actionTypes.ADD_CHANNEL,
    payload: channel
});

export const deleteChannelFactory = (dependencies) =>
    (channelId, userEmail) =>
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

                return dependencies.makePatchRequest(API_APP_URI, requestData, { headers });
            });

            return request
                .then(() => {
                    dispatch(deleteChannelAction(channelId));
                })
                .catch(() => {
                    dispatch(serverError);
                });

        };

export const deleteChannelAction = (channelId) => ({
    type: actionTypes.CHANNEL_DELETE_CHANNEL,
    payload: channelId,
});

export const leaveChannelFactory = (dependencies) =>
    ({id, name, ownerIds, userIds}, userEmail) =>
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

                return dependencies.makePatchRequest(API_APP_URI, requestData, {headers});
            });

            return request
                .then(() => {
                    dispatch(leaveChannelUi(id));
                })
                .catch(() => {
                    dispatch(serverError);
                });
        };

export const leaveChannelUi = (id) => ({
    type: actionTypes.CHANNEL_LEAVE_CHANNEL,
    payload: id
});

export const sendInvite = sendInviteFactory({ makePostRequest: axios.post });
export const fetchMessages = fetchMessagesFactory({ makeGetRequest: axios.get });
export const editChannel = editChannelFactory({ makePatchRequest: axios.patch });
export const addNewChannel = addNewChannelFactory({ makePatchRequest: axios.patch });
export const deleteChannel = deleteChannelFactory({ makePatchRequest: axios.patch });
export const leaveChannel = leaveChannelFactory({ makePatchRequest: axios.patch });
