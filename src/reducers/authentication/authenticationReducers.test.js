import { isAuthenticating, resolveAuthentication } from './authenticationReducers';
import { startAuthentication, failAuthentication, receiveValidToken, serverLoginError } from '../../actions/authentication/actionCreators';

describe('isAuthenticating authentication reducer tests', () => {
    test('sets authentication state to started', () => {
        const newState = isAuthenticating(false, startAuthentication());
        expect(newState).toBe(true);
    });

    test('sets is authenticating state to false after failed login', () => {
        const newState = isAuthenticating(true, failAuthentication());
        expect(newState).toBe(false);
    });

    test('sets is authenticating state to false after received token', () => {
        const newState = isAuthenticating(true, receiveValidToken({data: ''}));
        expect(newState).toBe(false);
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const newState = isAuthenticating(true, {type: ''});
        expect(newState).toBe(true);
    });
});

describe('resolveAuthentication authentication reducer tests', () => {
    test('correct token is saved after it is received', () => {
        const expectedState = { token: 'token', error: ''};
        const newState = resolveAuthentication(undefined, receiveValidToken({data: expectedState.token}));
        expect(newState.token).toContain(expectedState.token);
        expect(newState.error).toEqual(expectedState.error);
    });

    test('correct error is saved after server error', () => {
        const expectedState = {token: '', error: 'Could not load all the data from server. Please try again later.'};
        const newState = resolveAuthentication(undefined, serverLoginError());
        expect(newState.token).toEqual(expectedState.token);
        expect(newState.error).toEqual(expectedState.error);
    });

    test('state persists when no relevant action type is sent to saveLoggedUser reducer', () => {
        const expectedState = {token: '', error: ''};
        const newState = resolveAuthentication(undefined, {type: ''});
        expect(newState).toEqual(expectedState);
    });
});