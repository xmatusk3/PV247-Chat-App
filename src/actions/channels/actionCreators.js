import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_APP_URI,
} from '../../constants/api';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';

export const updateChannel = (item) => ({
    type: actionTypes.CHANNEL_UPDATE_CHANNEL,
    payload: {
        item,
    }
});

export const cancelEditingChannel = () => ({
    type: actionTypes.CHANNEL_CANCEL_EDITING_CHANNEL,
});

export const setIsBeingEdited = (payload) => ({
    type: actionTypes.SET_EDITOR_OPEN,
    payload,
});

export const addNewChannel = (channelName, userID) =>
    (dispatch) => {
        const customData = {
            'ownerIds': [userID],
            'userIds': []
        };

        const requestData = [{
            'path': '/channels/-',
            'op': 'add',
            'value': {
                'name': channelName,
                'customData': JSON.stringify(customData)
            }
        }];

        const request = fetchAuthToken(userID).then((token) => {
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
                    payload: response.data['channels'][response.data['channels'].length - 1]
                });
                dispatch({
                    type: actionTypes.SET_EDITOR_OPEN,
                    payload: false
                });
            })
            .catch(() => {
                dispatch({
                    type: actionTypes.SHARED_API_ERROR,
                    payload: 'Server error, please try again later.'
                });
            });

    };


export const fetchChannels = () => ({
    type: actionTypes.FETCH_CHANNELS,
});