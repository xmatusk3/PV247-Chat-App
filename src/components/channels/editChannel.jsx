import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { List } from 'immutable';

import { editChannel, cancelEditing } from '../../actions/channels/actionCreators';

class EditChannel extends React.Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        user: PropTypes.string.isRequired,
        userList: PropTypes.instanceOf(List),
        handleSubmit: PropTypes.func.isRequired,
        editChannel: PropTypes.func.isRequired,
        cancelEditing: PropTypes.func.isRequired
    };

    channelUsers = () => this.props.userList.filter(user => this.props.channel.userIds.includes(user.email));

    onSubmit = (formData) => {
        const formKeys = Object.values(Object.keys(formData)).filter(key => key !== 'channelName');

        const ownerIds = this.props.channel.ownerIds.concat(List(formKeys));
        const userIds = this.props.channel.userIds.filter(user => !formKeys.includes(user.email));

        this.props.editChannel({...this.props.channel, ownerIds, userIds}, this.props.user);
    };

    renderField = (field) => {
        const {meta: { touched, error} } = field;

        return(
            <div>
                <label>{field.type === 'text' ? field.label : ''}</label>
                <input
                    {...field.input}
                    type={field.type}
                    placeholder={field.placeholder}
                />
                <label>{field.type === 'checkbox' ? field.label : ''}</label>
                <div>
                    {touched ? error : ''}
                </div>
            </div>
        );
    };

    render() {
        const users = this.channelUsers()
            .map((user) =>
                <Field
                    label={user.email}
                    key={user.email}
                    name={user.customData}
                    type="checkbox"
                    component={this.renderField}
                />);

        const {handleSubmit} = this.props;

        return (
            <div>
                <h2>Editing channel {this.props.channel.name}</h2>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        label='Edit channel name:'
                        name='channelName'
                        type='text'
                        placeholder={this.props.channel.name}
                        component={this.renderField}
                    />
                    <p>Check users to promote:</p>
                    {users}
                    <button type="submit">Save channel</button>
                </form>
                <button type="button" onClick={this.props.cancelEditing}>Cancel</button>
            </div>
        );
    }
}

export default reduxForm({
    form: 'EditChannelForm'
}) (connect( (state) => ({
    user: state.users.user.email,
    channel: state.channels.editedChannel,
    userList: state.users.all}),
    { editChannel, cancelEditing }
)(EditChannel));
