import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_MESSAGE,
    API_MESSAGE_CHANGE
} from '../../constants/api';
import { Map } from 'immutable';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';
import parseMessageResponse from '../../utils/api/parseMessageResponse';

export const sendChatMessage = (message) =>
    (dispatch, getState) => {
        const { channels: { openedChannel: { channelId } }, users: { user: { email } } } = getState();

        const requestData = {
            'value': message.message,
            'customData': JSON.stringify({votedBy: Map([ [email, 1] ]), inlineStyles: message.inlineStyles})
        };

        const request = fetchAuthToken(email).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json-patch+json'
            };

            return axios.post(API_MESSAGE(channelId), requestData, { headers });
        });

        request
            .then(({data}) => dispatch(addMessage(parseMessageResponse(data))))
            .catch(() => ({
                type: actionTypes.SHARED_API_ERROR,
                payload: 'Server error, please try again later.'
            }));
    };

export const deleteMessage = (messageId) =>
    (dispatch, getState) => {
        const {users: {user: {email}}, channels: {openedChannel: {channelId}}} = getState();

        const request = fetchAuthToken(email)
            .then(({data}) => {
                const headers = {
                    'Authorization' : `Bearer ${data}`
                };
                return axios.delete(API_MESSAGE_CHANGE(channelId, messageId), {headers});
            });

        return request
            .then(() => dispatch({
                type: actionTypes.MESSAGE_DELETE_MESSAGE,
                payload: messageId
            }))
            .catch(() => ({
                type: actionTypes.SHARED_API_ERROR,
                payload: 'Server error, please try again later.'
            }));
    };

export const changeVoteMessage = (message, newVote) =>
    (dispatch, getState) => {
        const {users: {user: {email}}, channels: {openedChannel}} = getState();
        const newMessageData = {
            value: message.value,
            customData: JSON.stringify({...message.customData, votedBy: message.customData.votedBy.set(email, newVote)})
        };

        const request = fetchAuthToken(email)
            .then(({data}) => {
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${data}`,
                    'Content-Type': 'application/json-patch+json'
                };

                return axios.put(API_MESSAGE_CHANGE(openedChannel.channelId, message.id), newMessageData, {headers});
            });

        return request
            .then(({data}) => dispatch({
                type: actionTypes.CHANNEL_UPDATE_OPENED_CHANNEL,
                payload: { ...openedChannel,
                    messages: openedChannel.messages
                        .map(m => m.id === data.id ?
                            parseMessageResponse(data)
                            : m)}
            }))
            .catch(() => ({
                type: actionTypes.SHARED_API_ERROR,
                payload: 'Server error, please try again later.'
            }));
    };

const addMessage = (data) => ({
    type: actionTypes.MESSAGE_ADD_MESSAGE,
    payload: data
});