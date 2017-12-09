import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { ChannelDiv } from './__styles__/channel.styles.jsx';
import { deleteChannel, leaveChannel, startEditChannel, startInviteUsers } from '../../actions/channels/actionCreators';

const FontAwesome = require('react-fontawesome');

class Channel extends React.Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        channel: PropTypes.object.isRequired,
        deleteChannel: PropTypes.func.isRequired,
        leaveChannel: PropTypes.func.isRequired,
        startEditChannel: PropTypes.func.isRequired,
        startInviteUsers: PropTypes.func.isRequired
    };

    isAdmin = () => this.props.channel.ownerIds.includes(this.props.user);
    isOnlyAdmin = () => this.props.channel.ownerIds.size === 1 && this.props.channel.ownerIds.includes(this.props.user);

    render() {
        return (
            <ChannelDiv id={this.props.channel.id}>
                <div>
                    {this.props.channel.name}
                </div>
                {this.isAdmin() &&
                <FontAwesome
                    className='fa fa-pencil-square-o'
                    name='fa-pencil-square-o'
                    size='lg'
                    spin
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    onClick = {() => this.props.startEditChannel(this.props.channel)}
                />}
                {this.isAdmin() &&
                <FontAwesome
                    className='fa fa-plus-square'
                    name='fa-plus-square'
                    size='lg'
                    spin
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    onClick = {() => this.props.startInviteUsers(this.props.channel)}
                    />}
                {this.isAdmin() &&
                <FontAwesome
                    className='fa fa-times'
                    name='fa-times'
                    size='lg'
                    spin
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    onClick = {() => this.props.deleteChannel(this.props.channel.id, this.props.user)}
                />}
                {!this.isOnlyAdmin() &&
                <FontAwesome
                    className='fa fa-sign-out'
                    name='fa-sign-out'
                    aria-hidden='false'
                    size='lg'
                    spin
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    onClick = {() => this.props.leaveChannel(this.props.channel, this.props.user)}
                />}
            </ChannelDiv>
        );
    }
}

export default connect(null, { deleteChannel, leaveChannel, startEditChannel, startInviteUsers })(Channel);