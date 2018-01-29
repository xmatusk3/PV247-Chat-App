import {
    fetchUserAvatarFactory,
    fetchUserDetailsFactory,
    uploadUserDetailsFactory,
    uploadUserAvatarFactory,
    updateProfileAvatar,
    updateProfileDetails,
    startFetchingProfileAvatar,
    startFetchingProfileDetails,
    startUploadingProfileAvatar
} from './actionCreators';
import {
    stopSubmit
} from 'redux-form';

describe('profile thunk tests', () => {
    test('fetchUserAvatar dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = 'testData';
        const makeGetRequest = jest.fn(() => Promise.resolve({data: resData}));

        const getState = () => ({users: { user: { email: 'test@test.test' } } });

        const fetchUserAvatar = fetchUserAvatarFactory({makeGetRequest});
        const dispatchable = fetchUserAvatar(1);
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(startFetchingProfileAvatar());
        expect(dispatch).toHaveBeenLastCalledWith(updateProfileAvatar(resData));
        done();
    });

    test('fetchUserDetails dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = {email: 'test@test.test', customData: '{"avatarId": "2"}'};
        const makeGetRequest = jest.fn(() => Promise.resolve({data: resData}));

        const getState = () => ({users: { user: { email: 'test@test.test' } } });

        //eslint-disable-next-line
        const mockFetchUserAvatar = (id) => {};

        const fetchUserDetails = fetchUserDetailsFactory({
            makeGetRequest,
            fetchUserAvatar: mockFetchUserAvatar
        });
        const dispatchable = fetchUserDetails();
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(startFetchingProfileDetails());
        expect(dispatch).toHaveBeenCalledWith(startFetchingProfileAvatar());

        expect(dispatch).toHaveBeenCalledWith(updateProfileDetails({id: '', nickname: '', avatarId: '2', avatarUri: ''}));
        expect(dispatch).toHaveBeenLastCalledWith(mockFetchUserAvatar(2));
        done();
    });

    test('uploadUserDetails dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = {email: 'test@test.test', customData: '{"avatarId": "2"}'};
        const makePutRequest = jest.fn(() => Promise.resolve({data: resData}));

        const getState = () => ({users: { user: { email: 'test@test.test' } } });

        const uploadUserDetails = uploadUserDetailsFactory({makePutRequest});
        const details = {};
        const dispatchable = uploadUserDetails(details);
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(updateProfileDetails({avatarId: '2', email: 'test@test.test'}));
        expect(dispatch).toHaveBeenLastCalledWith(stopSubmit('DetailsForm'));
        done();
    });

    test('uploadUserAvatar dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = {
            id: '2462c000-be4a-46e4-8e33-58938254656c',
            name: 'test'
        };
        const resDataList = [ resData ];
        const makePostRequest = jest.fn(() => Promise.resolve({data: resDataList}));

        const getState = () => ({users: { user: { email: 'test@test.test' } } });

        //eslint-disable-next-line
        const mockFetchUserAvatar = (avatarId) => {};

        const uploadUserAvatar = uploadUserAvatarFactory({
            makePostRequest,
            fetchUserAvatar: mockFetchUserAvatar,
        });
        const dispatchable = uploadUserAvatar('testFile');
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(startUploadingProfileAvatar());
        expect(dispatch).toHaveBeenCalledWith(mockFetchUserAvatar(resData.id));
        done();
    });

});