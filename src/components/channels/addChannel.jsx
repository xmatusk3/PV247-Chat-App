import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import { Field, reduxForm } from 'redux-form';
import {addNewChannel, closeAddChannel} from 'actions/channels/actionCreators';

class AddChannel extends React.PureComponent{
    static propTypes = {
        newChannelName: PropTypes.string.isRequired,
        addNewChannel: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        userId: PropTypes.string.isRequired,
        serverError: PropTypes.string.isRequired,
        users: PropTypes.instanceOf(List),
        closeAddChannel: PropTypes.func.isRequired
    };

    onSubmit(formData) {
        const formKeys = Object.values(Object.keys(formData));

        const users = this.props.users
            .filter((user) => formKeys.includes(user.customData))
            .map((user) => user.email);

        this.props.addNewChannel({channelName: formData.channelName, users}, this.props.userId);
    }

    onCancel() {
        this.props.closeAddChannel();
    }

    renderField(field) {
        const {meta: { touched, error} } = field;

        return(
            <div>
                <label>{field.type === 'text' ? field.label : ''}</label>
                <input
                    {...field.input}
                    type={field.type}
                />
                <label>{field.type === 'checkbox' ? field.label : ''}</label>
                <div>
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        const {handleSubmit} = this.props;

        const users = this.props.users
            .filter((user) => user.email !== this.props.userId)
            .map((user) =>
                <Field
                    label={user.email}
                    key={user.email}
                    name={user.customData}
                    value={user.email}
                    type="checkbox"
                    component={this.renderField}
                />);

        return (
            <div>
                {this.props.serverError}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        name="channelName"
                        label="Channel name:"
                        type="text"
                        placeholder="Channel name"
                        component={this.renderField}
                    />
                    <p>Add users to channel:</p>
                    {users}
                    <button type="submit">Add Channel</button>
                </form>
                <button type="button" onClick={this.onCancel.bind(this)}>Cancel</button>
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
            userId: state.users.user.email,
            serverError: state.channels.ui.error,
            users: state.users.all
        }),
        (dispatch) => ({
            addNewChannel: (newChannelData, user) => dispatch(addNewChannel(newChannelData, user)),
            closeAddChannel: () => dispatch(closeAddChannel())
        }))(AddChannel)
);