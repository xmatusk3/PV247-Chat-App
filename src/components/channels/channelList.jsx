import React from 'react';
import PropTypes from 'prop-types';
import { ChannelListDiv } from './__styles__/channelList.styles.jsx';

export class ChannelList extends React.Component {
    static propTypes = {
        channels: PropTypes.array.isRequired,
    };

    render() {
        return (
            <ChannelListDiv>
                {...this.props.channels}
            </ChannelListDiv>
        );
    }
}