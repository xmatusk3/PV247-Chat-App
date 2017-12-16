import { saveLoggedUser } from './userReducers';
import { saveLoggedUser as saveLoggedUserAction } from '../../actions/shared/actionCreators';
import { getUserData } from '../../actions/profile/actionCreators';
import { uuid } from '../../utils/uuidGenerator';

describe('user reducer tests', () => {
    test('stores logged user data', () => {
        const expectedEmail = 'test@test.test';
        const expectedCustomData = {id: uuid(), nickname: '', avatarId: '', avatarUri: ''};
        const expectedUserData = { email: 'test@test.test', customData: expectedCustomData};
        const newState = saveLoggedUser(undefined, saveLoggedUserAction(getUserData({...expectedUserData, customData: JSON.stringify(expectedCustomData)}), expectedEmail));
        expect(newState).toEqual(expectedUserData);
    });
});
