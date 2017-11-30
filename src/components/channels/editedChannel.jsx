import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {addNewChannel} from 'actions/channels/actionCreators';

class EditedChannel extends React.PureComponent{
    static propTypes = {
        newChannelName: PropTypes.string.isRequired,
        setNewChannelName: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        userId: PropTypes.string.isRequired,
        serverError: PropTypes.string.isRequired
    };

    onSubmit({ channelName }) {
        this.props.setNewChannelName(channelName, this.props.userId);
    }

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
                {this.props.serverError}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

    return errors;
};

export default reduxForm({
    validate,
    form: 'EditChannelForm'
})(
    connect(
        (state) => ({
            newChannelName: state.channels.ui.newChannelName,
            userId: state.auth.user.email,
            serverError: state.channels.ui.error
        }),
        (dispatch) => ({
            setNewChannelName: (newChannelData, user) => dispatch(addNewChannel(newChannelData, user)),
        }))(EditedChannel)
);