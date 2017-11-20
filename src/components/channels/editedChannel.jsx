import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addChannel, setNewChannelName} from 'actions/channels/actionCreators';

class EditedChannel extends React.PureComponent{
    static propTypes = {
        // id: PropTypes.string.isRequired,
        newChannelName: PropTypes.string.isRequired,
        onAddChannel: PropTypes.func.isRequired,
        setNewChannelName: PropTypes.func.isRequired,
        //name: PropTypes.string.isRequired
        //ownerId: PropTypes.string.isRequired,
        // submitButtonText: PropTypes.string.isRequired,
        // onSubmit: PropTypes.func.isRequired,
        // onCancel: PropTypes.func.isRequired
    };

    render() {
        const {newChannelName, onAddChannel, setNewChannelName} = this.props;

        return (
            <div>
                <input type="text" value={newChannelName} onChange={setNewChannelName}/>
                <button onClick={onAddChannel}>Add Channel</button>
                {/*<p>test add channel</p>*/}
            </div>
        );
    }
//{this.props.name} <!-- onClick={this.props.onSubmit}/> -->
}

export default connect(
    (state) => ({
        newChannelName: state.channels.ui.newChannelName,
    }),
    (dispatch) => ({
        onAddChannel: () => dispatch(addChannel),
        setNewChannelName: (e) => dispatch(setNewChannelName(e.target.value)),
    })
)(EditedChannel);