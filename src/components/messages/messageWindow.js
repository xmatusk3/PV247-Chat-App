import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './message';

class MessageWindow extends Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        userEmail: PropTypes.string.isRequired
    };

    render() {
        const messages = this.props.channel.messages.map(m =>
            (
                <Message
                    key={m.id}
                    message={m}
                    isOwnMessage={m.createdBy === this.props.userEmail}
                />
            ));

        return (
            <div style={{border: '1px solid black', display: 'flex', flexDirection: 'column-reverse'}}>
                {messages}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        userEmail: state.users.user.email,
        channel: state.channels.openedChannel
    }), null)(MessageWindow);