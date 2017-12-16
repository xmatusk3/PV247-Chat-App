import { Map } from 'immutable';

const parseMessageResponse = (messageResponse) => {
    const parsedCustomData = JSON.parse(messageResponse.customData);
    return {
        ...messageResponse,
        value : JSON.parse(messageResponse.value),
        customData : {
            votedBy: Map(parsedCustomData.votedBy),
            inlineStyles : parsedCustomData.inlineStyles,
            attachment: {
                attachmentId : parsedCustomData.attachment.attachmentId,
                attachmentUri: parsedCustomData.attachment.attachmentUri,
                attachmentName: parsedCustomData.attachment.attachmentName
            }
        }
    };
};

export default parseMessageResponse;