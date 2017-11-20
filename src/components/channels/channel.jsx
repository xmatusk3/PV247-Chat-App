import React from 'react';
import PropTypes from 'prop-types';
import { ChannelDiv } from './__styles__/channel.styles.jsx';

export class Channel extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ownerId: PropTypes.string.isRequired
    };

    render() {
        return (
            <ChannelDiv id={this.props.id}>
                <div>
                    {this.props.name}
                </div>
            </ChannelDiv>
        );
    }
}