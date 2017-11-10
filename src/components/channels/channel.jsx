import React from 'react';
import PropTypes from 'prop-types';
import { Channel as ChannelDiv } from './__styles__/channel.styles.jsx';

export class Channel extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    };

    render() {
        return (
            <ChannelDiv id={this.props.id}>
                {this.props.name}
            </ChannelDiv>
        );
    }
}