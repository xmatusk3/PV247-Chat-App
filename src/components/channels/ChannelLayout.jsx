import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import ChannelList from 'components/channels/channelList.jsx';
import AddChannel from 'components/channels/addChannel.jsx';
import EditChannel from 'components/channels/editChannel.jsx';
import { ChannelLayoutDiv } from './__styles__/channelLayout.styles.jsx';
import { TopBarDiv, TopBarHeader } from '../profile/__styles__/topBarProfile.styles';
import Profile from '../profile/Profile.jsx';
import { setProfileIsOpened } from '../../actions/channels/actionCreators';

const FontAwesome = require('react-fontawesome');

class ChannelLayout extends React.PureComponent {
    static propTypes = {
        isBeingEdited: PropTypes.bool.isRequired,
        isBeingAdded: PropTypes.bool.isRequired,
        profileIsOpened: PropTypes.bool.isRequired,
        user: PropTypes.string.isRequired,
        setProfileIsOpened: PropTypes.func.isRequired
    };

    isLoggedIn() {
        return this.props.user !== '';
    }

    render() {
        if (!this.isLoggedIn()) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <TopBarDiv>
                    <FontAwesome
                        className='fa fa-user'
                        name='fa-user'
                        size='lg'
                        spin
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        onClick = {this.props.setProfileIsOpened}
                    />
                    <TopBarHeader>{`Currently logged as ${this.props.user}`}</TopBarHeader>
                </TopBarDiv>
                <ChannelLayoutDiv>
                    <ChannelList />
                    {this.props.isBeingAdded && <AddChannel />}
                    {this.props.isBeingEdited && <EditChannel />}
                    {this.props.profileIsOpened && <Profile />}
                </ChannelLayoutDiv>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isBeingAdded: state.channels.ui.isBeingAdded,
        isBeingEdited: state.channels.ui.isBeingEdited,
        profileIsOpened: state.channels.ui.profileIsOpened,
        user: state.users.user.email
    }),
    {setProfileIsOpened}
)(ChannelLayout);
