import {
    authenticateUserFactory,
    receiveValidToken,

    fetchLoggedUserFactory,
    saveLoggedUser,

    fetchAllChannelsFactory,
    updateChannels,

    fetchAllUsersFactory,
    updateUsers
} from './actionCreators';
import { List } from 'immutable';
import { getUserData } from '../profile/actionCreators';
import { push } from 'connected-react-router';

describe('authentication thunk tests', () => {
    test('authenticateUser dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const expectedEmail = 'email';
        const expectedToken = {data: 'token'};
        const mockFetchLoggedUser = () => {};
        const mockFetchAllUsers = () => {};
        const mockFetchAllChannels = () => {};
        const makePostRequest = jest.fn(() => Promise.resolve(expectedToken));

        const authenticateUser = authenticateUserFactory({makePostRequest,
            fetchAllUsers: mockFetchAllUsers,
            fetchLoggedUser: mockFetchLoggedUser,
            fetchAllChannels: mockFetchAllChannels,
        });
        const dispatchable = authenticateUser(expectedEmail);
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenCalledWith(receiveValidToken(expectedToken));
        expect(dispatch).toHaveBeenCalledWith(mockFetchLoggedUser());
        expect(dispatch).toHaveBeenCalledWith(mockFetchAllUsers());
        expect(dispatch).toHaveBeenLastCalledWith(mockFetchAllChannels());
        done();
    });

    test('fetchAllChannels dispatches correct action', async done => {
        const dispatch = jest.fn();
        const makeGetRequest = jest.fn(() => Promise.resolve({data: {channels: []}}));

        const fetchAllChannels = fetchAllChannelsFactory({makeGetRequest});
        const dispatchable = fetchAllChannels({data: ''});
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenLastCalledWith(updateChannels(List()));
        done();
    });

    test('fetchLoggedUserFactory dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const expectedEmail = 'email';
        const expectedData = {email: 'email', customData: JSON.stringify('""')};
        const makeGetRequest = jest.fn(() => Promise.resolve({data: expectedData}));

        const fetchLoggedUser = fetchLoggedUserFactory({makeGetRequest});
        const dispatchable = fetchLoggedUser(expectedEmail, {data: ''});
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenCalledWith(saveLoggedUser(getUserData(expectedData).customData, expectedEmail));
        expect(dispatch).toHaveBeenLastCalledWith(push('/chat'));
        done();
    });

    test('fetchAllUsers dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makeGetRequest = jest.fn(() => Promise.resolve({data: List()}));

        const expectedList = List();
        const fetchAllUsers = fetchAllUsersFactory({makeGetRequest});
        const dispatchable = fetchAllUsers({data: ''});
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenLastCalledWith(updateUsers(expectedList));
        done();
    });
});
