import { List } from 'immutable';

const parse = (channelResponse) => {
    const customData  = JSON.parse(channelResponse.customData);

    return{
        id: channelResponse.id,
        name: channelResponse.name,
        ownerIds: List(customData.ownerIds),
        userIds: List(customData.userIds)
    };
};

export default parse;