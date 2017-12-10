import { Set } from 'immutable';

const parse = (channelResponse) => {
    const customData  = JSON.parse(channelResponse.customData);

    return{
        id: channelResponse.id,
        name: channelResponse.name,
        ownerIds: Set(customData.ownerIds || []),
        userIds: Set(customData.userIds || [])
    };
};

export default parse;