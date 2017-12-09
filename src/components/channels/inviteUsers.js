import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import { List } from 'immutable';
import validateEmail from '../../utils/validateEmail';

import { editChannel, sendInvite, cancelInviting} from '../../actions/channels/actionCreators';

class InviteUsers extends Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        userList: PropTypes.instanceOf(List),
        channel: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        sendInvite: PropTypes.func.isRequired,
        editChannel: PropTypes.func.isRequired,
        cancelInviting: PropTypes.func.isRequired
    };

    renderField = (field) => {
        const {meta: {touched, error} } = field;

        return (
            <div>
                <label>{field.label}</label>
                <input
                    {...field.input}
                />
                <div>
                    {touched ? error : ''}
                </div>
            </div>
        );
    };

    inviteUser = ( {inviteUser} ) => {

        if (!this.props.channel.userIds.union(this.props.channel.ownerIds).includes(inviteUser)) {
            this.props.editChannel({...this.props.channel, userIds: this.props.channel.userIds.add(inviteUser)}, this.props.user);
        }

        if (!this.props.userList.reduce((res, user) => res || (user.email === inviteUser), false)) {
            this.props.sendInvite(inviteUser, this.props.user);
        }
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.inviteUser)} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Field
                        name="inviteUser"
                        placeholder="Invited user's email"
                        type="text"
                        label="Invite a user by email:"
                        component={this.renderField}
                    />
                    <button type="submit">Invite!</button>
                </form>
                <button type="button" onClick={() => this.props.cancelInviting()}>Cancel</button>
            </div>
        );
    }
}

const validate = ({ inviteUser }) => {
    const errors = {};

    if (!inviteUser) {
        errors.inviteUser = 'Enter a nonempty email.';
    }
    else if (!validateEmail(inviteUser)) {
        errors.inviteUser = 'Enter an email in valid format.';
    }

    return errors;
};

export default reduxForm({
    validate,
    form: 'InviteUserForm'
})(
    connect(
        (state) => ({
            userList: state.users.all,
            channel: state.channels.editedChannel,
            user: state.users.user.email
        }),
        { editChannel, sendInvite, cancelInviting }
    ) (InviteUsers)
);
