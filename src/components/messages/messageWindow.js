import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './message';
import { List } from 'immutable';
import { fetchMessages } from '../../actions/channels/actionCreators';

class MessageWindow extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        userEmail: PropTypes.string.isRequired,
        userList: PropTypes.instanceOf(List),
        fetchMessages: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.intervalId = setInterval(this.props.fetchMessages, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

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
        userList: state.users.all,
    }), {fetchMessages})(MessageWindow);