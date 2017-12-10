import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import ChannelList from 'components/channels/channelList.jsx';
import AddChannel from 'components/channels/addChannel.jsx';
import EditChannel from 'components/channels/editChannel.jsx';
import InviteUsers from 'components/channels/inviteUsers';
import { ChannelLayoutDiv } from './__styles__/channelLayout.styles.jsx';

class ChannelLayout extends React.PureComponent {
    static propTypes = {
        isBeingEdited: PropTypes.bool.isRequired,
        isBeingAdded: PropTypes.bool.isRequired,
        isBeingInvited: PropTypes.bool.isRequired,
        user: PropTypes.string.isRequired
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
                <h3>{`Currently logged as ${this.props.user}`}</h3>
                <ChannelLayoutDiv>
                    <ChannelList />
                    {this.props.isBeingAdded && <AddChannel />}
                    {this.props.isBeingEdited && <EditChannel />}
                    {this.props.isBeingInvited && <InviteUsers />}
                </ChannelLayoutDiv>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isBeingAdded: state.channels.ui.isBeingAdded,
        isBeingEdited: state.channels.ui.isBeingEdited,
        isBeingInvited: state.channels.ui.isBeingInvited,
        user: state.users.user.email
    }),
    null
)(ChannelLayout);
