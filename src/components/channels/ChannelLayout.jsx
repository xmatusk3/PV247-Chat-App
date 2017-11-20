import * as React from 'react';
//import * as routes from '../../constants/routes';
import PropTypes from 'prop-types';
// import { ChannelList } from '../../containers-redux/channels/channelList.jsx';
import ChannelList from 'components/channels/channelList.jsx';
import {connect} from 'react-redux';



import EditedChannel from 'components/channels/editedChannel.jsx';
import { ChannelLayoutDiv } from './__styles__/channelLayout.styles.jsx';

class ChannelLayout extends React.PureComponent {
    static propTypes = {
        isBeingEdited: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ChannelLayoutDiv>
                <ChannelList />
                {this.props.isBeingEdited ?  <EditedChannel /> : <p>Risko zere hovna a mu chuci</p> }
            </ChannelLayoutDiv>
        );
    }
}

export default connect(
    (state) => ({
        isBeingEdited: state.channels.ui.isBeingEdited,
    }),
    null,
)(ChannelLayout);
