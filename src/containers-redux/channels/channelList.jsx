import { connect } from 'react-redux';
import { uuid } from '../../utils/uuidGenerator';
import { Channel } from '../../components/channels/channel.jsx';
import List from 'immutable';

const mapStateToProps = () => ({
    id: uuid(),
    list: new List()
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Channel);

export { connectedComponent as Channel };