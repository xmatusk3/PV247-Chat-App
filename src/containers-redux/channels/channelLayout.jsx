import { connect } from 'react-redux';
import { ChannelLayout } from '../../components/channels/ChannelLayout.jsx';

const mapStateToProps = (state) => ({
    isBeingEdited: state.channelReducers.openChannelEditor
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(ChannelLayout);

export { connectedComponent as ChannelLayout };