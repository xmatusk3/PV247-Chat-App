import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        sender: PropTypes.string.isRequired,
        isOwnMessage: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div style={{display: 'flex', flexDirection: this.props.isOwnMessage ? 'row-reverse' : 'row'}}>
                <div style={{backgroundColor: this.props.isOwnMessage ? 'orange' : 'grey'}}>
                    {`${this.props.sender}: ${this.props.message}`}
                </div>
            </div>
        );
    }
}

export default Message;