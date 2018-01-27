import {
    addChannelUi,
    addNewChannelFactory,
    addUser,
    deleteChannelAction,
    deleteChannelFactory,
    editChannelFactory,
    fetchMessagesFactory,
    leaveChannelFactory,
    leaveChannelUi,
    loadMessagesUi,
    openAddChannelUi,
    sendInviteFactory,
    updateChannel,
    updateEditedChannel
} from './actionCreators';
import { parseUser } from '../../utils/api/parseUserResponse';
import { List } from 'immutable';
import parseChannelResponse from '../../utils/api/parseChannelResponse';

describe('channels thunk tests', () => {
    test('sendInvite dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makePostRequest = jest.fn(() => Promise.resolve({data: {customData: '""'}}));

        const sendInvite = sendInviteFactory({makePostRequest});
        const dispatchable = sendInvite('newEmail', 'test@test.test');
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenLastCalledWith(addUser(parseUser({customData: '""'})));
        done();
    });

    test('fetchMessages dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makeGetRequest = jest.fn(() => Promise.resolve({data: List()}));
        const getState = () => ({
            users: {
                user: {
                    email: 'test@test.test'
                }
            }
        });

        const fetchMessages = fetchMessagesFactory({makeGetRequest});
        const dispatchable = fetchMessages(1);
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenLastCalledWith(loadMessagesUi(List()));
        done();
    });

    test('editChannel dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makePatchRequest = jest.fn(() => Promise.resolve());
        const expectedChannel = {
            ownerIds: List(['owner']),
            userIds: List(['user']),
            id: 'id',
            name: 'testChannel'
        };

        const editChannel = editChannelFactory({makePatchRequest});
        const dispatchable = editChannel(expectedChannel, 'test@test.test');
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenCalledWith(updateChannel(expectedChannel));
        expect(dispatch).toHaveBeenLastCalledWith(updateEditedChannel(expectedChannel));
        done();
    });

    test('addNewChannel dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const expectedChannel = {
            customData: '{"id": "id", "name": "name"}',
            userIds: ['user'],
            ownerIds: ['test@test.test']
        };
        const makePatchRequest = jest.fn(() => Promise.resolve({
            data: {
                channels: [expectedChannel]
            }
        }));
        const expectedData = {channelName: 'testChannel', users: ['user']};


        const addNewChannel = addNewChannelFactory({makePatchRequest});
        const dispatchable = addNewChannel(expectedData, 'test@test.test');
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenCalledWith(addChannelUi(parseChannelResponse(expectedChannel)));
        expect(dispatch).toHaveBeenLastCalledWith(openAddChannelUi(false));
        done();
    });

    test('deleteChannel dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makePatchRequest = jest.fn(() => Promise.resolve());
        const expectedChannelId = 'channelId';

        const deleteChannel = deleteChannelFactory({makePatchRequest});
        const dispatchable = deleteChannel(expectedChannelId, 'test@test.test');
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenLastCalledWith(deleteChannelAction(expectedChannelId));
        done();
    });

    test('leaveChannel dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makePatchRequest = jest.fn(() => Promise.resolve());
        const expectedChannel = {
            id: 'testChannelId',
            name: 'testChannel',
            userIds: List(['user']),
            ownerIds: List(['test@test.test'])
        };

        const leaveChannel = leaveChannelFactory({makePatchRequest});
        const dispatchable = leaveChannel(expectedChannel, 'test@test.test');
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenLastCalledWith(leaveChannelUi(expectedChannel.id));
        done();
    });
});