import { connect } from 'react-redux';
import { uuid } from '../../utils/uuidGenerator';
import { Channel } from '../../components/channels/channel.jsx';

const mapStateToProps = () => ({
    id: uuid(),
    name: uuid() + 'PLACEHOLDER_NAME'
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Channel);

export { connectedComponent as Channel };
