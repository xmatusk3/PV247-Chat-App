import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {addChannel, setNewChannelName} from 'actions/channels/actionCreators';

class EditedChannel extends React.PureComponent{
    static propTypes = {
        newChannelName: PropTypes.string.isRequired,
        onAddChannel: PropTypes.func.isRequired,
        setNewChannelName: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    renderChannelName(field) {
        const {meta: { touched, error} } = field;

        return(
            <div>
                <label>Channel name:</label>
                <input
                    placeholder="Channel name"
                    type="text"
                    {...field.input}
                />
                <div>
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.setNewChannelName)}>
                    <Field
                        name="channelName"
                        component={this.renderChannelName}
                    />
                    <button type="submit">Add Channel</button>
                </form>
            </div>
        );
    }
}

const validate = ({ channelName }) => {
    const errors = {};

    if (!channelName) {
        errors.channelName = 'Enter a nonempty channel name!';
    }
};

export default reduxForm({
    validate,
    form: 'EditChannelForm'
})(
    connect(
        (state) => ({
            newChannelName: state.channels.ui.newChannelName,
        }),
        (dispatch) => ({
            onAddChannel: () => dispatch(addChannel),
            setNewChannelName: ({channelName}) => dispatch(setNewChannelName(channelName)),
        }))(EditedChannel)
);