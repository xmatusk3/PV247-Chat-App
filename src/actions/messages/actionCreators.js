import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_FILE_URI,
    API_MESSAGE,
    API_MESSAGE_CHANGE,
    createApiFileUri
} from '../../constants/api';
import { Map } from 'immutable';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';
import parseMessageResponse from '../../utils/api/parseMessageResponse';
import { serverError } from '../authentication/actionCreators';

export const sendChatMessageFactory = (dependencies) =>
    (message, attachmentCustomData = {attachmentName: '', attachmentUri: '', attachmentId: ''}) =>
        (dispatch, getState) => {
            const { channels: { openedChannel: { channel: { id } } }, users: { user: { email } } } = getState();

            const requestData = {
                'value': message.message,
                'customData': JSON.stringify({
                    votedBy: Map([ [email, 1] ]),
                    inlineStyles: message.inlineStyles,
                    attachment: attachmentCustomData})
            };

            const request = fetchAuthToken(email).then((token) => {
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.data}`,
                    'Content-Type': 'application/json-patch+json'
                };

                return dependencies.makePostRequest(API_MESSAGE(id), requestData, { headers });
            });

            return request
                .then(({data}) => {
                    dispatch(addMessage(parseMessageResponse(data)));
                })
                .catch(() => dispatch(serverError()));
        };

export const editChatMessageFactory = (dependencies) =>
    (newMessage, messageId, attachmentData) =>
        (dispatch, getState) => {
            const { channels: { openedChannel: { channel: { id } } }, users: { user: { email } } } = getState();

            const requestData = {
                'value': newMessage.message,
                'customData': JSON.stringify({
                    votedBy: Map([ [email, 1] ]),
                    inlineStyles: newMessage.inlineStyles,
                    attachment: attachmentData
                })
            };

            const request = fetchAuthToken(email).then((token) => {
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.data}`,
                    'Content-Type': 'application/json-patch+json'
                };

                return dependencies.makePutRequest(API_MESSAGE_CHANGE(id, messageId), requestData, { headers });
            });

            return request
                .then(({data}) => {
                    dispatch(editMessage(parseMessageResponse(data)));
                })
                .catch(() => dispatch(serverError()));
        };

export const deleteMessageFactory = (dependencies) =>
    (messageId) =>
        (dispatch, getState) => {
            const {users: {user: {email}}, channels: {openedChannel: {channel: { id } } } } = getState();

            const request = fetchAuthToken(email)
                .then(({data}) => {
                    const headers = {
                        'Authorization' : `Bearer ${data}`
                    };
                    return dependencies.makeDeleteRequest(API_MESSAGE_CHANGE(id, messageId), {headers});
                });

            return request
                .then(() => dispatch({
                    type: actionTypes.MESSAGE_DELETE_MESSAGE,
                    payload: messageId
                }))
                .catch(() => dispatch(serverError()));
        };

export const deleteMessageUi = (messageId) => ({
    type: actionTypes.MESSAGE_DELETE_MESSAGE,
    payload: messageId
});

export const changeVoteMessageFactory = (dependencies) =>
    (message, newVote) =>
        (dispatch, getState) => {
            const {users: { user: { email } }, channels: { openedChannel } } = getState();
            const newMessageData = {
                value: JSON.stringify(message.value),
                customData: JSON.stringify({...message.customData, votedBy: message.customData.votedBy.set(email, newVote)})
            };

            const request = fetchAuthToken(email)
                .then(({data}) => {
                    const headers = {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${data}`,
                        'Content-Type': 'application/json-patch+json'
                    };
                    return dependencies.makePutRequest(API_MESSAGE_CHANGE(openedChannel.channel.id, message.id), newMessageData, {headers});
                });

            return request
                .then(({data}) =>
                    dispatch(updateOpenedChannel({ ...openedChannel,
                        messages: openedChannel.messages
                            .map(m => m.id === data.id ?
                                parseMessageResponse(data)
                                : m)}))
                )
                .catch(() => dispatch(serverError()));
        };

export const updateOpenedChannel = (channel) => ({
    type: actionTypes.CHANNEL_UPDATE_OPENED_CHANNEL,
    payload: channel
});

export const attachFileToMessageFactory = (dependencies) =>
    (file, content) =>
        (dispatch, getState) => {
            let formData = new FormData();
            formData.append('Files', file);

            const request = fetchAuthToken(getState().users.user.email).then((token) => {
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.data}`,
                    'Content-Type': 'multipart/form-data'
                };

                return dependencies.makePostRequest(API_FILE_URI, formData, { headers });
            });

            return request
                .then(({data}) => {
                    if(!data || !data[0] || !data[0].id){
                        throw new Error('Attachment uploaded to the server, however, server did not store the file.');
                    }
                    dispatch(dependencies.fetchAttachmentUri(data[0].id, data[0].name, content));
                })
                .catch(() => dispatch(serverError()));
        };

export const fetchAttachmentUriFactory = (dependencies) =>
    (attachmentId, attachmentName, content) =>
        (dispatch, getState) => {
            const request = fetchAuthToken(getState().users.user.email).then((token) => {
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.data}`,
                    'Content-Type': 'application/json'
                };

                return dependencies.makeGetRequest(createApiFileUri(attachmentId), { headers });
            });

            return request
                .then(({data}) => {
                    const attachmentCustomData = {attachmentId, attachmentName, attachmentUri: data};
                    dispatch(dependencies.sendChatMessage(content, attachmentCustomData));
                })
                .catch(() => dispatch(serverError()));
        };


export const editMessage = (data) => ({
    type: actionTypes.MESSAGE_EDIT_MESSAGE,
    payload: data
});

export const addMessage = (data) => ({
    type: actionTypes.MESSAGE_ADD_MESSAGE,
    payload: data
});

export const sendChatMessage = sendChatMessageFactory({ makePostRequest: axios.post });

export const fetchAttachmentUri = fetchAttachmentUriFactory({
    makeGetRequest: axios.get,
    sendChatMessage});

export const editChatMessage = editChatMessageFactory({ makePutRequest: axios.put });
export const deleteMessage = deleteMessageFactory({ makeDeleteRequest: axios.delete });
export const changeVoteMessage = changeVoteMessageFactory({ makePutRequest: axios.put });

export const attachFileToMessage = attachFileToMessageFactory({
    makePostRequest: axios.post,
    fetchAttachmentUri: fetchAttachmentUri});

