import {
    sendChatMessageFactory,
    addMessage,
    editChatMessageFactory,
    editMessage,
    deleteMessageFactory,
    changeVoteMessageFactory,
    updateOpenedChannel,
    attachFileToMessageFactory,
    fetchAttachmentUriFactory
} from './actionCreators';
import * as actionTypes from '../../constants/actionTypes';
import Immutable from 'immutable';
import parseMessageResponse from '../../utils/api/parseMessageResponse';

describe('messages thunk tests', () => {
    test('sendChatMessage dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = {
            id: '2462c000-be4a-46e4-8e33-58938254656c',
            value: '{"entityMap":{}, "blocks":[{"key":"14o2s","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            createdAt: '2018-01-29T09:30:21.0029109Z',
            createdBy: 'test@test.test',
            updatedAt: '2018-01-29T09:30:21.0029109Z',
            updatedBy: 'test@test.test',
            customData: '{"votedBy":{"test@test.test":1},"inlineStyles":{},"attachment":{"attachmentName":"","attachmentUri":"","attachmentId":""}}'};
        const makePostRequest = jest.fn(() => Promise.resolve({data: resData}));

        const getState = () => ({ channels: { openedChannel: { channel: { id: 1 } } }, users: { user: { email: 'test@test.test' } } });

        const sendChatMessage = sendChatMessageFactory({makePostRequest});
        const dispatchable = sendChatMessage({message: 'test', attachmentCustomData: {attachmentName: '', attachmentUri: '', attachmentId: ''}});
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenLastCalledWith(addMessage(parseMessageResponse(resData)));
        done();
    });

    test('editChatMessage dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = {
            id: '2462c000-be4a-46e4-8e33-58938254656c',
            value: '{"entityMap":{}, "blocks":[{"key":"14o2s","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            createdAt: '2018-01-29T09:30:21.0029109Z',
            createdBy: 'test@test.test',
            updatedAt: '2018-01-29T09:30:21.0029109Z',
            updatedBy: 'test@test.test',
            customData: '{"votedBy":{"test@test.test":1},"inlineStyles":{},"attachment":{"attachmentName":"","attachmentUri":"","attachmentId":""}}'};
        const makePutRequest = jest.fn(() => Promise.resolve({data: resData}));

        const getState = () => ({ channels: { openedChannel: { channel: { id: 1 } } }, users: { user: { email: 'test@test.test' } } });

        const editChatMessage = editChatMessageFactory({makePutRequest});
        const dispatchable = editChatMessage({message: 'test', messageId: '2462c000-be4a-46e4-8e33-58938254656c', attachmentCustomData: {attachmentName: '', attachmentUri: '', attachmentId: ''}});
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenLastCalledWith(editMessage(parseMessageResponse(resData)));
        done();
    });

    test('deleteChatMessage dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makeDeleteRequest = jest.fn(() => Promise.resolve());

        const getState = () => ({users: {user: {email: 'test@test.test'}}, channels: {openedChannel: {channel: { id: 1 } } } });

        const deleteChatMessage = deleteMessageFactory({makeDeleteRequest});
        const dispatchable = deleteChatMessage('2462c000-be4a-46e4-8e33-58938254656c');
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenLastCalledWith({type: actionTypes.MESSAGE_DELETE_MESSAGE, payload: '2462c000-be4a-46e4-8e33-58938254656c'});
        done();
    });

    test('changeVoteMessage dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = {
            id: '2462c000-be4a-46e4-8e33-58938254656c',
            value: '{"entityMap":{}, "blocks":[{"key":"14o2s","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            createdAt: '2018-01-29T09:30:21.0029109Z',
            createdBy: 'test@test.test',
            updatedAt: '2018-01-29T09:30:21.0029109Z',
            updatedBy: 'test@test.test',
            customData: '{"votedBy":{"test@test.test":1},"inlineStyles":{},"attachment":{"attachmentName":"","attachmentUri":"","attachmentId":""}}'};
        const makePutRequest = jest.fn(() => Promise.resolve({ data: resData }));

        const message = {
            id: '2462c000-be4a-46e4-8e33-58938254656c',
            value: '{"entityMap":{}, "blocks":[{"key":"14o2s","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            createdAt: '2018-01-29T09:30:21.0029109Z',
            createdBy: 'test@test.test',
            updatedAt: '2018-01-29T09:30:21.0029109Z',
            updatedBy: 'test@test.test',
            customData: { votedBy: new Immutable.Map()}};

        const mess = new Immutable.List().push(message);
        const getState = () => ({users: { user: { email: 'test@test.test' } },
            channels: { openedChannel: { channel: { id: 1}, messages: mess } } });

        const changeVoteMessage = changeVoteMessageFactory({makePutRequest});
        const dispatchable = changeVoteMessage(message, 1);
        await dispatchable(dispatch, getState);

        const mes = new Immutable.List().push(parseMessageResponse(resData));
        expect(dispatch).toHaveBeenLastCalledWith(updateOpenedChannel({channel: { id: 1 }, messages: mes } ));
        done();
    });

    test('attachFileToMessage dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = {
            id: '2462c000-be4a-46e4-8e33-58938254656c',
            name: 'test'
        };
        const resDataList = [ resData ];
        const makePostRequest = jest.fn(() => Promise.resolve({data: resDataList}));
        const getState = () => ({users: { user: { email: 'test@test.test' } } });

        //eslint-disable-next-line
        const mockFetchAttachmentUri = (id, name, fileContent) => {};

        const attachFileToMessage = attachFileToMessageFactory({
            makePostRequest,
            fetchAttachmentUri: mockFetchAttachmentUri});
        const fileContent = 'testFileContent';
        const dispatchable = attachFileToMessage('test', fileContent);
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenLastCalledWith(mockFetchAttachmentUri(resData.id, resData.name, fileContent));
        done();
    });

    test('fetchAttachmentUri dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const resData = 'test.test/fileUri/2462c000-be4a-46e4-8e33-58938254656c';
        const makeGetRequest = jest.fn(() => Promise.resolve({data: resData}));
        const getState = () => ({users: { user: { email: 'test@test.test' } } });

        const attachmentCustomData = {attachmendId: '2462c000-be4a-46e4-8e33-58938254656c', attachmentName: 'test', attachmentUri: resData};

        //eslint-disable-next-line
        const mockSendChatMessage = (id, name, fileContent) => {};

        const fetchAttachmentUri = fetchAttachmentUriFactory({
            makeGetRequest,
            sendChatMessage: mockSendChatMessage});
        const fileContent = 'testFileContent';
        const dispatchable = fetchAttachmentUri('2462c000-be4a-46e4-8e33-58938254656c', 'test', fileContent);
        await dispatchable(dispatch, getState);

        expect(dispatch).toHaveBeenLastCalledWith(mockSendChatMessage(fileContent, attachmentCustomData));
        done();
    });

});