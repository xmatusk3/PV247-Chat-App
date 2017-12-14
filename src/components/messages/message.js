import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, EditorState } from 'draft-js';

import enrichHTML from  '../../utils/enrichHTML';
import { AvatarImage } from '../profile/Avatar.styles';
import { deleteMessage, changeVoteMessage } from '../../actions/messages/actionCreators';
import TextEditor from './textEditor';


class Message extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        deleteMessage: PropTypes.func.isRequired,
        changeVoteMessage: PropTypes.func.isRequired,
        senderUser: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = ({isBeingEditedMessage: false});
    }

    onChangeVote = (newVote) => {
        this.props.changeVoteMessage(this.props.message, newVote);
    };

    changeBeingEdited = () => {
        this.setState({isBeingEditedMessage: !this.state.isBeingEditedMessage});
    };

    convertMessageToHTML = (message, inlineStyles) => {
        const contentState = convertFromRaw(message);
        const html = stateToHTML(contentState, {inlineStyles: inlineStyles});
        const enrichedHTML = enrichHTML(html);
        return enrichedHTML;
    };

    render() {
        const isOwnMessage = this.props.user.email === this.props.message.createdBy;
        const {customData: {votedBy}} = this.props.message;
        const alreadyUpvoted = votedBy.has(this.props.user.email) && votedBy.get(this.props.user.email) === 1;
        const alreadyDownvoted = votedBy.has(this.props.user.email) && votedBy.get(this.props.user.email) === -1;

        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{flexWrap: 'wrap',
                        margin: '2px',
                        border: '1px solid black',
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
                        backgroundColor: isOwnMessage ? 'orange' : 'grey'}}
                    >
                        <div style={{display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                <AvatarImage
                                    className="img-rounded"
                                    alt="Profile picture"
                                    src={this.props.senderUser.avatarUri}
                                    title={this.props.senderUser.email}
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
                                    onClick={this.changeBeingEdited}
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
                        {this.state.isBeingEditedMessage ?
                            <TextEditor
                                editorState={EditorState.createWithContent(convertFromRaw(this.props.message.value))}
                                messageId={this.props.message.id}
                                closeMessageCallback={this.changeBeingEdited}
                            />
                            :
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div>
                                    {this.props.senderUser.nickname || this.props.senderUser.email}:
                                </div>
                                <div dangerouslySetInnerHTML={{
                                    __html: this.convertMessageToHTML(this.props.message.value, this.props.message.customData.inlineStyles)
                                }}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}



export default connect((state) => ({user: state.users.user}), {deleteMessage, changeVoteMessage})(Message);