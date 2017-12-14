import { Map } from 'immutable';

const parseMessageResponse = (messageResponse) => (
    {
        ...messageResponse,
        value: JSON.parse(messageResponse.value),
        customData: {votedBy: Map(JSON.parse(messageResponse.customData).votedBy), inlineStyles: JSON.parse(messageResponse.customData).inlineStyles}
    }
);

export default parseMessageResponse;