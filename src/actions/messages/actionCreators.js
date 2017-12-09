import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_MESSAGE
} from '../../constants/api';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';

export const sendChatMessage = (message) =>
    (dispatch, getState) => {
        const { channels: { openedChannel: { channelId } }, users: { user: { email } } } = getState();

        const requestData = {
            'value': message,
            'customData': ''
        };

        const request = fetchAuthToken(email).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json-patch+json'
            };

            return axios.post(API_MESSAGE(channelId), JSON.stringify(requestData), { headers });
        });

        request
            .then(({data}) => dispatch(addMessage(data)))
            .catch(() => ({
                type: actionTypes.SHARED_API_ERROR,
                payload: 'Server error, please try again later.'
            }));
    };

const addMessage = (data) => ({
    type: actionTypes.MESSAGE_ADD_MESSAGE,
    payload: data
});