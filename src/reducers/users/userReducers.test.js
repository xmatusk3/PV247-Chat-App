import { saveLoggedUser, saveAllUsers } from './userReducers';
import { updateUsers, saveLoggedUser as saveLoggedUserAction } from '../../actions/shared/actionCreators';
import { updateProfileDetails, updateProfileAvatar } from '../../actions/profile/actionCreators';
import { addUser } from '../../actions/channels/actionCreators';
import { getUserData } from '../../actions/profile/actionCreators';
import { uuid } from '../../utils/uuidGenerator';
import { List } from 'immutable';

const customData = {id: uuid(), nickname: '', avatarId: '', avatarUri: ''};
const userData = { email: 'test@test.test', ...customData};
const nonExistentAction = {type: 'DefinitelyNonExistentActionType'}

describe('saveLoggedUser reducer tests', () => {
    test('stores new logged user data after login', () => {
        const expectedEmail = 'test@test.test';
        const newState = saveLoggedUser(undefined, saveLoggedUserAction(getUserData({...userData, customData: JSON.stringify(userData)}).customData, expectedEmail));
        expect(newState).toEqual(userData);
    });

    test('updates current logged user', () => {
        const expectedEmail = 'new@email.com';
        const newState = saveLoggedUser(userData, updateProfileDetails({email: expectedEmail}));
        expect(newState).toEqual({...userData, email: expectedEmail});
    });

    test('updates current logged user avatar', () => {
        const expectedUri = 'testUri';
        const expectedCustomData = {...customData, avatarUri: expectedUri};
        const newState = saveLoggedUser(userData, updateProfileAvatar(expectedUri));
        expect(newState).toEqual({...userData, ...expectedCustomData});
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = saveLoggedUser(userData, nonExistentAction);
        expect(newState).toBe(userData);
    });
});

describe('saveAllUsers reducer tests', () => {
    const user2 = {...userData, id: uuid(), nickname: 'newNick'};
    const userList = List([userData, user2]);
    test('updates correct user from the list after his profile is updated', () => {
        const expectedNick = 'yetAnotherNewNick';
        const expectedState = userList.set(1, {...user2, nickname: 'yetAnotherNewNick'});
        const newState = saveAllUsers(userList, updateProfileDetails({...user2, nickname: expectedNick}));
        expect(newState).toEqual(expectedState);
    });

    test('updates user list to new user list', () => {
        const newState = saveAllUsers(undefined, updateUsers(userList));
        expect(newState).toBe(userList);
    });

    test('adds new user to user list', () => {
        const newUser = {...user2, id: uuid(), nickname: 'newUser'};
        const expectedState = userList.push(newUser);
        const newState = saveAllUsers(userList, addUser(newUser));
        expect(newState).toEqual(expectedState);
    });

    test('state persists when no relevant action type is sent to saveAllUsers reducer', () => {
        const newState = saveAllUsers(userList, nonExistentAction);
        expect(newState).toBe(userList);
});
});
