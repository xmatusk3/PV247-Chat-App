import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { AvatarImage } from '../profile/Avatar.styles';

import { deleteMessage, changeVoteMessage } from '../../actions/messages/actionCreators';

class Message extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        deleteMessage: PropTypes.func.isRequired,
        changeVoteMessage: PropTypes.func.isRequired,
        senderUser: PropTypes.object.isRequired
    };

    onChangeVote = (newVote) => {
        this.props.changeVoteMessage(this.props.message, newVote);
    };

    render() {
        const isOwnMessage = this.props.user.email === this.props.message.createdBy;
        const {customData: {votedBy}} = this.props.message;
        const alreadyUpvoted = votedBy.has(this.props.user.email) && votedBy.get(this.props.user.email) === 1;
        const alreadyDownvoted = votedBy.has(this.props.user.email) && votedBy.get(this.props.user.email) === -1;

        return (
            <div style={{width: '1300px', display: 'flex auto'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{flexWrap: 'wrap', margin: '2px', border: '1px solid black', display: 'flex', flexDirection: 'column', alignSelf: isOwnMessage ? 'flex-end' : 'flex-start', backgroundColor: isOwnMessage ? 'orange' : 'grey'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <AvatarImage
                                    className="img-rounded"
                                    alt="Profile picture"
                                    src={this.props.senderUser.avatarUri}
                                    title={this.props.message.createdBy}
                                />
                            </div>
                            <div>
                                <span style={{backgroundColor: 'white'}}>
                                    {votedBy.valueSeq().reduce((res, val) => res+val, 0)}
                                </span>
                                <FontAwesome
                                    className='fa fa-arrow-up'
                                    name='fa-arrow-up'
                                    size='lg'
                                    spin
                                    style={{color: alreadyUpvoted ? 'red' : 'black', marginRight: '3px', marginLeft: '3px', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    onClick={() => this.onChangeVote(alreadyUpvoted ? 0 : 1)}

                                />
                                <FontAwesome
                                    className='fa fa-arrow-down'
                                    name='fa-arrow-down'
                                    size='lg'
                                    spin
                                    style={{color: alreadyDownvoted ? 'red' : 'black', marginRight: '3px', marginLeft: '3px', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    onClick={() => this.onChangeVote(alreadyDownvoted ? 0 : -1)}
                                />
                                {isOwnMessage &&
                                <FontAwesome
                                    className='fa fa-pencil'
                                    name='fa-pencil'
                                    size='lg'
                                    spin
                                    style={{marginRight: '3px', marginLeft: '3px', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />}
                                {isOwnMessage &&
                                <FontAwesome
                                    className='fa fa-times'
                                    name='fa-times'
                                    size='lg'
                                    spin
                                    style={{ marginRight: '3px', marginLeft: '3px',textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    onClick={() => this.props.deleteMessage(this.props.message.id)}
                                />}
                            </div>
                        </div>
                        <hr />
                        <div style={{display: 'flex', flexWrap: 'wrap', wordWrap: 'break-word'}}>
                            {`${this.props.message.value}`}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({user: state.users.user}), {deleteMessage, changeVoteMessage})(Message);