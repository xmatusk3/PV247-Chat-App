import { Map } from 'immutable';

const parseMessageResponse = (messageResponse) => (
    {...messageResponse,
        customData: {votedBy: Map(JSON.parse(messageResponse.customData).votedBy)}
    }
);

export default parseMessageResponse;