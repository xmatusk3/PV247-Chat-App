export const parseProfile = (customData) => {
    const replacedData = customData.replace(/'/g, '"');
    const parsedCustomData = JSON.parse(replacedData);
    return {
        id: parsedCustomData.id || '',
        nickname: parsedCustomData.nickname || '',
        avatarId: parsedCustomData.avatarId || '',
        avatarUri: parsedCustomData.avatarUri || '',
    };
};

export const parseUser = (data) => {
    const replacedData = data.customData.replace(/'/g, '"');
    const parsedCustomData = JSON.parse(replacedData);
    return {
        id: parsedCustomData.id || '',
        nickname: parsedCustomData.nickname || '',
        avatarId: parsedCustomData.avatarId || '',
        avatarUri: parsedCustomData.avatarUri || '',
        email: data.email,
    };
};

