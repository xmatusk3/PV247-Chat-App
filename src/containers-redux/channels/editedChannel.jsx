import { connect } from 'react-redux';
import EditedChannel from '../../components/channels/editedChannel.jsx';
// import { updateChannel } from '../../actions/channels/actionCreators';
import { uuid } from '../../utils/uuidGenerator';

const mapStateToProps = () => ({
    id: uuid(),
    //name: 'PIETER'
});

// const mapDispatchToProps = (dispatch) => ({
//     onSubmit: (channel) => dispatch(updateChannel(channel)),
// });

const enhancer = connect(mapStateToProps);//, mapDispatchToProps);
const connectedComponent = enhancer(EditedChannel);

export { connectedComponent as EditedChannel };
