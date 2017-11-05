import * as keys from '../constants/localStorageKeys';

const VALID_HOURS = 24;

const isTokenTimeStampValid = () => {
    const originTimeStampJSON = localStorage.getItem(keys.SHARED_TOKEN_TIMESTAMP);
    if(!originTimeStampJSON){
        return false;
    }

    const originTime = new Date(JSON.parse(originTimeStampJSON));
    const currentTime = new Date().getTime();
    const expirationTime = originTime.setHours(originTime.getHours() + VALID_HOURS);

    return expirationTime >= currentTime;
};

const removeInvalidToken = () => {
    localStorage.removeItem(keys.SHARED_TOKEN_TIMESTAMP);
    localStorage.removeItem(keys.SHARED_TOKEN);
};

export const getPersistedToken = () => {
    const persistedTokenJSON = localStorage.getItem(keys.SHARED_TOKEN) || null;

    if (persistedTokenJSON && !isTokenTimeStampValid()) {
        removeInvalidToken();
        return null;
    }

    return persistedTokenJSON && JSON.parse(persistedTokenJSON);
};
