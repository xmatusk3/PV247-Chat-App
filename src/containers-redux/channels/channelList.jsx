import { connect } from 'react-redux';
import { uuid } from '../../utils/uuidGenerator';
import { ChannelList } from '../../components/channels/channelList.jsx';
import Immutable from 'immutable';
import { openAddNewChannel } from '../../actions/channels/actionCreators';

const mapStateToProps = (state) => ({
    id: uuid(),
    list: Immutable.List([
        {id: uuid(), name: 'riba'},
        {id: uuid(), name: 'ris'},
        {id: uuid(), name: 'risavi'},
        {id: uuid(), name: 'jozko'}
    ])
});

const mapDispatchToProps = (dispatch) => ({
    onAddChannelClick: () => dispatch(openAddNewChannel()),
});


const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(ChannelList);

export { connectedComponent as ChannelList };