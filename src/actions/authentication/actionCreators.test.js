import {
    fetchAllUsersFactory,
    updateUsers
} from './actionCreators';
import { List } from 'immutable';

describe('kokotiny', () => {
    test('dispatches actions in correct order', async done => {
        const makeGetRequest = jest.fn(() => Promise.resolve());
        const getState = () => ({
            shared: {
                token: 'pretty please'
            }
        });

        const expectedList = List();
        const fetchAllUsers = fetchAllUsersFactory({ makeGetRequest });
        const dispatchable = fetchAllUsers({data: ''});
        await dispatchable(makeGetRequest, getState);

        expect(makeGetRequest).toHaveBeenLastCalledWith(updateUsers(expectedList));
        done();
    });
});
