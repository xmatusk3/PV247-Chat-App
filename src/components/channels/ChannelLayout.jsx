import * as React from 'react';
import PropTypes from 'prop-types';
import ChannelList from 'components/channels/channelList.jsx';
import {connect} from 'react-redux';

import EditedChannel from 'components/channels/editedChannel.jsx';
import { ChannelLayoutDiv } from './__styles__/channelLayout.styles.jsx';

class ChannelLayout extends React.PureComponent {
    static propTypes = {
        isBeingEdited: PropTypes.bool.isRequired,
        user: PropTypes.string.isRequired
    };

    render() {
        return (
            <div>
                <ChannelLayoutDiv>
                    <ChannelList />
                    {this.props.isBeingEdited ?  <EditedChannel /> : <p>Risko zere hovna a mu chuci</p> }
                </ChannelLayoutDiv>
                <h3>{`Currently logged as ${this.props.user}`}</h3>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isBeingEdited: state.channels.ui.isBeingEdited,
        user: state.auth.user
    }),
    null,
)(ChannelLayout);
