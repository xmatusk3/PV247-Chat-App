import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { ChannelListDiv,  } from './__styles__/channelList.styles.jsx';
import { Channel } from './channel.jsx';
import {setIsBeingEdited, fetchChannels} from 'actions/channels/actionCreators.js';

const FontAwesome = require('react-fontawesome');

class ChannelList extends React.PureComponent {
    static propTypes = {
        list: PropTypes.instanceOf(Immutable.List).isRequired,
        setIsBeingEdited: PropTypes.func.isRequired,
    };

    render() {
        const channels = this.props.list.map(item =>
            <Channel key={item.id} name={item.name} ownerId={item.ownerId} id={item.id} users={item.users} />
        );

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
        };
    },
    (dispatch) => ({
        fetchChannels: dispatch(fetchChannels),
        setIsBeingEdited: (payload) => dispatch(setIsBeingEdited(payload))
    })
)(ChannelList);