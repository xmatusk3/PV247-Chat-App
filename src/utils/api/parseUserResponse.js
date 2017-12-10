const parse = (customData) => {
    const replacedData = customData.replace(/'/g, '"');
    const parsedCustomData = JSON.parse(replacedData);
    //const parsedCustomData = customData;
    return {
        id: parsedCustomData.id || '',
        nickname: parsedCustomData.nickname || '',
        avatarId: parsedCustomData.avatarId || '',
    };
};

export default parse;
