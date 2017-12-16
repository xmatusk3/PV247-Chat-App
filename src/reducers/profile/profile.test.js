import { isFetchingAvatar } from './isFetchingAvatar';
import { isFetchingDetails } from './isFetchingDetails';
import { isUploadingAvatar } from './isUploadingAvatar';

import { startFetchingProfileAvatar, updateProfileAvatar, startUploadingProfileAvatar } from '../../actions/profile/actionCreators';
import { startFetchingProfileDetails, updateProfileDetails } from '../../actions/profile/actionCreators';

describe('isFetchingAvatar profile reducer tests', () => {
    test('isFetchingAvatar state is set to true after avatar fetching started', () => {
        const newState = isFetchingAvatar(undefined, startFetchingProfileAvatar());
        expect(newState).toEqual(true);
    });

    test('isFetchingAvatar state is set to false after avatar fetching stopped', () => {
        const newState = isFetchingAvatar(undefined, updateProfileAvatar(null));
        expect(newState).toEqual(false);
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = isFetchingAvatar(undefined, {type:''});
        expect(newState).toEqual(false);
    });
});

describe('isFetchingDetails profile reducer tests', () => {
    test('isFetchingDetails state is set to true after avatar fetching started', () => {
        const newState = isFetchingDetails(undefined, startFetchingProfileDetails());
        expect(newState).toEqual(true);
    });

    test('isFetchingDetails state is set to false after avatar fetching stopped', () => {
        const newState = isFetchingDetails(undefined, updateProfileDetails(null));
        expect(newState).toEqual(false);
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = isFetchingDetails(undefined, {type:''});
        expect(newState).toEqual(false);
    });
});

describe('isUploadingAvatar profile reducer tests', () => {
    test('isUploadingAvatar state is set to true after avatar fetching started', () => {
        const newState = isUploadingAvatar(undefined, startUploadingProfileAvatar());
        expect(newState).toEqual(true);
    });

    test('isUploadingAvatar state is set to false after avatar fetching stopped', () => {
        const newState = isUploadingAvatar(undefined, updateProfileAvatar(null));
        expect(newState).toEqual(false);
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = isUploadingAvatar(undefined, {type:''});
        expect(newState).toEqual(false);
    });
});