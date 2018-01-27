import {
    fetchAllUsersFactory,
    updateUsers
} from './actionCreators';
import { List } from 'immutable';

describe('kokotiny', () => {
    test('dispatches actions in correct order', async done => {
        const dispatch = jest.fn();
        const makeGetRequest = jest.fn(() => Promise.resolve({data: List()}));
        // const getState = () => ({
        //     shared: {
        //         token: 'pretty please'
        //     }
        // });

        const expectedList = List();
        const fetchAllUsers = fetchAllUsersFactory({makeGetRequest});
        const dispatchable = fetchAllUsers({data: ''});
        await dispatchable(dispatch);

        expect(dispatch).toHaveBeenLastCalledWith(updateUsers(expectedList));
        done();
    });
});
