import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import ChannelList from 'components/channels/channelList.jsx';
import EditedChannel from 'components/channels/addChannel.jsx';
import { ChannelLayoutDiv } from './__styles__/channelLayout.styles.jsx';

class ChannelLayout extends React.PureComponent {
    static propTypes = {
        isBeingEdited: PropTypes.bool.isRequired,
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
                    {this.props.isBeingEdited ?  <EditedChannel /> : <p>Risko zere hovna a mu chuci</p> }
                </ChannelLayoutDiv>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isBeingEdited: state.channels.ui.isBeingEdited,
        user: state.users.user.email
    }),
    null
)(ChannelLayout);
