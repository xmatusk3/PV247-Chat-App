import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addChannel, setNewChannelName} from 'actions/channels/actionCreators';

class EditedChannel extends React.PureComponent{
    static propTypes = {
        newChannelName: PropTypes.string.isRequired,
        onAddChannel: PropTypes.func.isRequired,
        setNewChannelName: PropTypes.func.isRequired,
    };

    render() {
        const {newChannelName, onAddChannel, setNewChannelName} = this.props;

        return (
            <div>
                <input type="text" value={newChannelName} onChange={setNewChannelName}/>
                <button onClick={onAddChannel}>Add Channel</button>
            </div>
        );
    }
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