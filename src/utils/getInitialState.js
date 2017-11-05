import { getPersistedToken } from './getPersistedToken';

export const getInitialState = () => ({
    //incresdNumbah: 0
    shared: {
        token: getPersistedToken()
    }
});