import { combineReducers } from 'redux';
import { avatarUri } from './avatarUri';
import { isFetchingDetails } from './isFetchingDetails';
import { isFetchingAvatar } from './isFetchingAvatar';
import { isUploadingAvatar } from './isUploadingAvatar';

export const profile = combineReducers({
    avatarUri,
    isFetchingDetails,
    isFetchingAvatar,
    isUploadingAvatar,
});
