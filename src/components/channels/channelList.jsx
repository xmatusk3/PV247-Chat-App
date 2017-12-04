import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { ChannelListDiv,  } from './__styles__/channelList.styles.jsx';
import Channel from './channel.jsx';
import {setIsBeingCreated} from 'actions/channels/actionCreators.js';

const FontAwesome = require('react-fontawesome');

class ChannelList extends React.PureComponent {
    static propTypes = {
        channelList: PropTypes.instanceOf(Immutable.List),
        setIsBeingCreated: PropTypes.func.isRequired,
        user: PropTypes.string.isRequired
    };

    render() {
        const channels =
            this.props.channelList
                .filter(item => item.ownerIds.contains(this.props.user) || item.userIds.contains(this.props.user))
                .map(item => <Channel key={item.id} channel={item} user={this.props.user} />);

        return (
            <ChannelListDiv>
                {channels}
                <FontAwesome
                    className='super-crazy-colors'
                    name='plus'
                    size='2x'
                    spin
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    onClick = {() => this.props.setIsBeingCreated(true)}
                >
                </FontAwesome>
            </ChannelListDiv>
        );
    }
}

export default connect(
    (state) => {
        return {
            channelList: state.channels.channelList,
            user: state.users.user.email
        };
    },
    (dispatch) => ({
        setIsBeingCreated: (payload) => dispatch(setIsBeingCreated(payload))
    })
)(ChannelList);