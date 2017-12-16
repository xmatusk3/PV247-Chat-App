import * as actionTypes from '../../constants/actionTypes';
import axios from 'axios';
import {
    API_FILE_URI,
    createApiUserUri,
    createApiFileUri
} from '../../constants/api';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';
import { serverError } from '../shared/actionCreators';
import {
    startSubmit,
    stopSubmit
} from 'redux-form';
import { parseProfile } from '../../utils/api/parseUserResponse';

export const updateProfileDetails = (details) => ({
    type: actionTypes.PROFILE_UPDATE_DETAILS,
    payload: details,
});

export const uploadUserAvatar = (file) =>
     (dispatch, getState) => {
         if(!file){
             throw new Error('Avatar type is not supported or the system could not load the file.');
         }

         dispatch(startUploadingProfileAvatar());

         let formData = new FormData();
         formData.append('Files', file);

         const request = fetchAuthToken(getState().users.user.email).then((token) => {
             const headers = {
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${token.data}`,
                 'Content-Type': 'multipart/form-data'
             };

             return axios.post(API_FILE_URI, formData, { headers });
         });

         return request
             .then(({data}) => {
                 if(!data || !data[0] || !data[0].id){
                     throw new Error('Avatar uploaded to the server, however, server did not store the file.');
                 }

                 dispatch(fetchUserAvatar(data[0].id)).then(() => dispatch(uploadUserDetails({avatarId: data[0].id})));
             })
             .catch(() => {
                 dispatch(serverError);
             });
     };

export const uploadUserDetails = (details) =>
    (dispatch, getState) => {
        dispatch(startSubmit('DetailsForm'));

        const newCustomData = JSON.stringify({
            ...getState().users.user,
            ...details,
            email: undefined,
        });

        const stringified = JSON.stringify(newCustomData);

        const userEmail = getState().users.user.email;
        const requestUri = createApiUserUri(userEmail);
        const request = fetchAuthToken(userEmail).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json'
            };

            return axios.put(requestUri, stringified, { headers });
        });

        return request
            .then(({data}) => {
                const receivedDetails = {
                    ...JSON.parse(data.customData || '{}'),
                    email: data.email,
                };
                dispatch(updateProfileDetails(receivedDetails));
                dispatch(stopSubmit('DetailsForm'));
            })
            .catch(() => {
                dispatch(serverError);
                dispatch(stopSubmit('DetailsForm'));
            });
    };

export const fetchUserAvatar = (avatarId) =>
    (dispatch, getState) => {
        dispatch(startFetchingProfileAvatar());

        const requestUri = createApiFileUri(avatarId);
        const request = fetchAuthToken(getState().users.user.email).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json'
            };

            return axios.get(requestUri, { headers });
        });

        return request
            .then(({data}) => {
                dispatch(updateProfileAvatar(data));
            })
            .catch(() => {
                dispatch(serverError);
            });
    };

export const fetchUserDetails = () =>
    (dispatch, getState) => {
        dispatch(startFetchingProfileDetails());
        dispatch(startFetchingProfileAvatar());

        const userEmail = getState().users.user.email;
        const requestUri = createApiUserUri(userEmail);
        const request = fetchAuthToken(userEmail).then((token) => {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json'
            };

            return axios.get(requestUri, { headers });
        });

        return request
            .then(({data}) => {
                const details = getUserData(data).customData;
                dispatch(updateProfileDetails(details));
                details.avatarId ? dispatch(fetchUserAvatar(details.avatarId)) : dispatch(updateProfileAvatar(null));
            })
            .catch(() => {
                dispatch(serverError);
            });
    };

export const getUserData = (data) => ({
    customData: parseProfile(data.customData),
    email: data.email,
});

export const updateProfileAvatar = (avatarUri) => ({
    type: actionTypes.PROFILE_UPDATE_AVATAR,
    payload: {
        avatarUri,
    }
});

export const startFetchingProfileDetails = () => ({
    type: actionTypes.PROFILE_FETCHING_STARTED,
});

export const startFetchingProfileAvatar = () => ({
    type: actionTypes.PROFILE_AVATAR_FETCHING_STARTED,
});

export const startUploadingProfileAvatar = () => ({
    type: actionTypes.PROFILE_AVATAR_UPLOADING_STARTED,
});