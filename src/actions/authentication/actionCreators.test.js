import {
    fetchAllUsersFactory,
    updateUsers
} from './actionCreators';
import { List } from 'immutable';

describe('authentication thunk tests', () => {
    test('dispatches actions in correct order', async done => {
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
