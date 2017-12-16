import { List, Set } from 'immutable';
import { defaultUiState, channelUiReducer, openedChannelReducer, channelListReducer, editedChannelReducer } from './channelReducers';
import {
    cancelEditing,
    startEditChannel,
    closeAddChannel,
    startInviteUsers,
    setProfileIsOpened,
    openChannelUi,
    closeChannelUi,
    leaveChannelUi,
    addChannelUi,
    updateChannel,
    cancelEditingUi,
    updateEditedChannel,
    cancelInviting,
    openAddChannelUi,
    loadMessagesUi,
} from '../../actions/channels/actionCreators';
import {
    addMessage,
    editMessage,
    deleteMessageUi,
    updateOpenedChannel
} from '../../actions/messages/actionCreators';
import {
    serverError,
    updateChannels
} from '../../actions/authentication/actionCreators';

describe('channelUiReducer channel reducer tests', () => {
    test('isBeingEdited is false after the editing is canceled', () => {
        const expectedState = defaultUiState;
        const newState =  channelUiReducer(defaultUiState, cancelEditing({userIds: Set()}, Set(), Set()));
        expect(newState).toEqual(expectedState);
    });

    test('isBeingEdited is true after the editing is opened', () => {
        const expectedState = {...defaultUiState, isBeingEdited: true};
        const newState =  channelUiReducer(defaultUiState, startEditChannel({userIds: Set()}, Set(), Set()));
        expect(newState).toEqual(expectedState);
    });

    test('isBeingAdded is false after closing the channel', () => {
        const expectedState = {...defaultUiState, isBeingAdded: false};
        const newState =  channelUiReducer(defaultUiState, closeAddChannel());
        expect(newState).toEqual(expectedState);
    });

    test('isBeingInvited is true after opening user inviting', () => {
        const expectedState = {...defaultUiState, isBeingInvited: true};
        const newState =  channelUiReducer(defaultUiState, startInviteUsers(null));
        expect(newState).toEqual(expectedState);
    });

    test('profileIsOpened is true after opening profile', () => {
        const expectedState = {...defaultUiState, profileIsOpened: true};
        const newState =  channelUiReducer(defaultUiState, setProfileIsOpened());
        expect(newState).toEqual(expectedState);
    });

    test('isBeingOpened is true after opening a channel', () => {
        const expectedState = {...defaultUiState, isBeingOpened: true};
        const newState =  channelUiReducer(defaultUiState, openChannelUi(null));
        expect(newState).toEqual(expectedState);
    });

    test('isBeingOpened is false after closing a channel', () => {
        const expectedState = {...defaultUiState, isBeingOpened: false};
        const newState =  channelUiReducer(defaultUiState, closeChannelUi());
        expect(newState).toEqual(expectedState);
    });

    test('Error is set after registering an API error', () => {
        const expectedState = {...defaultUiState, error: 'Server error, please try again later.'};
        const newState =  channelUiReducer(defaultUiState, serverError());
        expect(newState).toEqual(expectedState);
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = channelUiReducer(undefined, {type:''});
        expect(newState).toEqual(defaultUiState);
    });
});

describe('channelListReducer channel reducer tests', () => {
    const defaultState = List();
    const channelId = 'channelId';

    test('channel is removed after user leaves', () => {
        const state = List([{id: channelId}]);
        const newState = channelListReducer(state, leaveChannelUi(channelId));
        expect(newState).toEqual(defaultState);
    });

    test('channel is added after channel addition', () => {
        const state = List([{id: channelId}]);
        const newState = channelListReducer(defaultState, addChannelUi(state.get(0)));
        expect(newState).toEqual(state);
    });

    test('channel list is updated after channels update', () => {
        const state = List([{id: channelId}]);
        const newState = channelListReducer(undefined, updateChannels(state));
        expect(newState).toEqual(state);
    });

    test('channel list is updated after channel update', () => {
        const expectedName = 'name';
        const channel = {id: channelId, name: ''};
        const state = List([channel]);
        const newState = channelListReducer(state, updateChannel({...channel, name: expectedName}));
        expect(newState).toEqual(List([{...channel, name: expectedName}]));
    });

    test('channel list is updated after channel is closed', () => {
        const expectedName = 'name';
        const channel = {id: channelId, name: ''};
        const state = List([channel]);
        const newState = channelListReducer(state, cancelEditingUi({channel: {...channel, name: expectedName}, open: false}));
        expect(newState).toEqual(List([{...channel, name: expectedName}]));
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = channelListReducer(undefined, {type:''});
        expect(newState).toEqual(List());
    });
});

describe('editedChannelReducer channel reducer tests', () => {
    const channel = {id: '', name: ''};

    test('edited channel is set after open inviting', () => {
        const newState = editedChannelReducer(undefined, startInviteUsers(channel));
        expect(newState).toEqual(channel);
    });

    test('edited channel is set after open editing', () => {
        const newState = editedChannelReducer(undefined, startEditChannel(channel));
        expect(newState).toEqual(channel);
    });

    test('edited channel is set after updating edited channel', () => {
        const newState = editedChannelReducer(undefined, updateEditedChannel(channel));
        expect(newState).toEqual(channel);
    });
//TU
    test('edited channel is set to null after opening a channel', () => {
        const newState = editedChannelReducer(undefined, openChannelUi());
        expect(newState).toBeNull();
    });

    test('edited channel is set to null after canceling inviting', () => {
        const newState = editedChannelReducer(undefined, cancelInviting());
        expect(newState).toBeNull();
    });

    test('edited channel is set to null after canceling editing channel', () => {
        const newState = editedChannelReducer(undefined, cancelEditingUi(null));
        expect(newState).toBeNull();
    });

    test('edited channel is set to null after opening add channel', () => {
        const newState = editedChannelReducer(undefined, openAddChannelUi(channel));
        expect(newState).toBeNull();
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = editedChannelReducer(undefined, {type:''});
        expect(newState).toBeNull();
    });
});

describe('openedChannelReducer channel reducer tests', () => {
    const defaultState = {channel: null, messages: List()};
    const channel = {channelId: 'channelId', name: 'name' };
    const messages = List([{id: 'messageId', value: 'value'}]);

    test('opened channel is set correctly after opening channel', () => {
        const newState = openedChannelReducer(undefined, openChannelUi(channel));
        expect(newState).toEqual({...defaultState, channel});
    });

    test('message is added after adding a message', () => {
        const newState = openedChannelReducer(undefined, addMessage(messages.get(0)));
        expect(newState).toEqual({...defaultState, messages});
    });

    test('message is edited after editing a message', () => {
        const expectedMessage = {...messages.get(0), value: 'newValue'};
        const newState = openedChannelReducer({...defaultState, messages}, editMessage(expectedMessage));
        expect(newState).toEqual({...defaultState, messages: List([expectedMessage])});
    });

    test('messages are loaded after loading the messages', () => {
        const newState = openedChannelReducer(undefined, loadMessagesUi(messages));
        expect(newState).toEqual({...defaultState, messages});
    });

    test('message is deleted after deleting a message', () => {
        const newState = openedChannelReducer({...defaultState, messages}, deleteMessageUi(messages.get(0).id));
        expect(newState).toEqual(defaultState);
    });

    test('opened channel is cleared after editing a channel', () => {
        const newState = openedChannelReducer(undefined, startEditChannel(null));
        expect(newState).toEqual(defaultState);
    });

    test('opened channel is cleared after opening add channel', () => {
        const newState = openedChannelReducer(undefined, openAddChannelUi(null));
        expect(newState).toEqual(defaultState);
    });

    test('opened channel is cleared after opening inviting channel', () => {
        const newState = openedChannelReducer(undefined, startInviteUsers(null));
        expect(newState).toEqual(defaultState);
    });

    test('opened channel is updated after updating opened channel', () => {
        const newState = openedChannelReducer(undefined, updateOpenedChannel({...defaultState, channel}));
        expect(newState).toEqual({...defaultState, channel});
    });

    test('opened channel is closed after closing opened channel', () => {
        const newState = openedChannelReducer(undefined, closeChannelUi());
        expect(newState).toEqual(defaultState);
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = openedChannelReducer(undefined, {type:''});
        expect(newState).toEqual(defaultState);
    });
});