import { Set, Map } from 'immutable';
import parseChannelResponse from './parseChannelResponse';
import parseMessageResponse from './parseMessageResponse';
import {
    parseProfile,
    parseUser
} from './parseUserResponse';

describe('util API function tests', () => {
    test('parseChannelResponse util function test', () => {
        const customData = { ownerIds: Set([]), userIds: Set([])};
        const channelResponse = {id: 'id', name: 'name', customData: JSON.stringify(customData)};
        const expectedParseResult = {id: 'id', name: 'name', ...customData};
        expect(parseChannelResponse(channelResponse)).toEqual(expectedParseResult)
    });

    test('parseMessageResponse util function test', () => {
        const customData = {
            attachment: {
                attachmentId : '',
                attachmentUri: '',
                attachmentName: ''},
            inlineStyles: '',
            votedBy: Map()
        };
        const messageResponse = {value: JSON.stringify({}), customData: JSON.stringify(customData)};
        const expectedParseResult = {value: {}, customData};
        expect(parseMessageResponse(messageResponse)).toEqual(expectedParseResult);
    });

    test('parseProfile util function test', () => {
        const customData = {
            id: 'id',
            nickname: 'nickname',
            avatarId: 'avatarId',
            avatarUri: 'avatarUri',
        };
        const profileResponse = JSON.stringify(customData);
        expect(parseProfile(profileResponse)).toEqual(customData);
    });

    test('parseUser util function test', () => {
        const customData = {
            id: 'id',
            nickname: 'nickname',
            avatarId: 'avatarId',
            avatarUri: 'avatarUri',
        };
        const userResponse =  {email: 'email', customData: JSON.stringify(customData)};
        expect(parseUser(userResponse)).toEqual({email: 'email', ...customData});
    });
});