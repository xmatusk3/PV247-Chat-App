import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { ChannelListDiv,  } from './__styles__/channelList.styles.jsx';
import { Channel } from './channel.jsx';
import {setIsBeingEdited} from 'actions/channels/actionCreators.js';

const FontAwesome = require('react-fontawesome');

class ChannelList extends React.PureComponent {
    static propTypes = {
        list: PropTypes.instanceOf(Immutable.List),
        setIsBeingEdited: PropTypes.func.isRequired,
        user: PropTypes.string.isRequired
    };

    render() {
        // eslint-disable-next-line
        console.log(this.props.list);
        const channels =
            this.props.list
                .filter(item => item.ownerIds.contains(this.props.user) || item.userIds.contains(this.props.user))
                .map(item => <Channel key={item.id} name={item.name} id={item.id} />);

        return (
            <ChannelListDiv>
                {channels}
                <FontAwesome
                    className='super-crazy-colors'
                    name='plus'
                    size='2x'
                    spin
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    onClick = {() => this.props.setIsBeingEdited(true)}
                >
                </FontAwesome>
            </ChannelListDiv>
        );
    }
}

export default connect(
    (state) => {
        return {
            list: state.channels.channelList,
            user: state.users.user.email
        };
    },
    (dispatch) => ({
        setIsBeingEdited: (payload) => dispatch(setIsBeingEdited(payload))
    })
)(ChannelList);