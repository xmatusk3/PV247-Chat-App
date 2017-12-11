import { combineReducers } from 'redux';
import { isFetchingDetails } from './isFetchingDetails';
import { isFetchingAvatar } from './isFetchingAvatar';
import { isUploadingAvatar } from './isUploadingAvatar';

export const profile = combineReducers({
    isFetchingDetails,
    isFetchingAvatar,
    isUploadingAvatar,
});
