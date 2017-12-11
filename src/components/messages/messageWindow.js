import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './message';
import { List } from 'immutable';

class MessageWindow extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        userEmail: PropTypes.string.isRequired,
        userList: PropTypes.instanceOf(List)
    };

    render() {
        const messages = this.props.messages.map(m =>
            (
                <Message
                    key={m.id}
                    message={m}
                    senderUser={this.props.userList.find((user) => (user.email === m.createdBy))}
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
        messages: state.channels.openedChannel.messages,
        userList: state.users.all
    }), null)(MessageWindow);