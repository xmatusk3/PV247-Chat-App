import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field} from 'redux-form';
import PropTypes from 'prop-types';
import { List, Set } from 'immutable';

import { editChannel, cancelEditing, removeUserUI } from '../../actions/channels/actionCreators';

class EditChannel extends React.Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        user: PropTypes.string.isRequired,
        userList: PropTypes.instanceOf(List),
        handleSubmit: PropTypes.func.isRequired,
        editChannel: PropTypes.func.isRequired,
        cancelEditing: PropTypes.func.isRequired,
        removeUserUI: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.usersToKick = Set();
        this.usersToPromote = Set();
    }

    onSubmit = (formData) => {
        if (this.usersToKick.length === 0
            && this.usersToPromote.length === 0
            && !formData.channelName) {
            return;
        }

        this.props.editChannel(
            {
                ...this.props.channel,
                name: formData.channelName || this.props.channel.name,
                ownerIds: this.props.channel.ownerIds.union(this.usersToPromote),
                userIds: this.props.channel.userIds.subtract(this.usersToKick).subtract(this.usersToPromote)
            },
            this.props.user);
    };

    promoteUser = (userEmail) => {
        this.usersToPromote = this.usersToPromote.add(userEmail);

        this.props.removeUserUI({...this.props.channel, userIds: this.props.channel.userIds.remove(userEmail)});

    };

    kickUser = (userEmail) => {
        this.usersToKick = this.usersToKick.add(userEmail);

        this.props.removeUserUI({...this.props.channel, userIds: this.props.channel.userIds.remove(userEmail)});
    };

    renderField = (field) => {
        return (
            <div>
                <label>{field.label}</label>
                <input
                    {...field.input}
                    type="text"
                />
            </div>
        );
    };

    render() {
        const users = this.props.channel.userIds
            .map((user) =>
                <div key={user} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <p>{user}</p>
                    <button type="button" onClick={() => this.promoteUser(user)}>Promote</button>
                    <button type="button" onClick={() => this.kickUser(user)}>Kick</button>
                </div>
            );

        const {handleSubmit} = this.props;

        return (
            <div>
                <h2>Editing channel {this.props.channel.name}</h2>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <p>Change name:</p>
                        <Field
                            placeholder={this.props.channel.name}
                            name="channelName"
                            component={this.renderField}
                        />
                    </div>
                    <div>
                        <p>User Management:</p>
                        {users}
                    </div>
                    <div style={{display: 'flex', alignItems: 'flex-start'}}>
                        <button type="button" onClick={() => this.props.cancelEditing(this.props.channel, this.usersToPromote, this.usersToKick)}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'EditChannelForm'
})(connect( (state) => ({
    user: state.users.user.email,
    channel: state.channels.editedChannel,
    userList: state.users.all,
}),
    { editChannel, cancelEditing, removeUserUI }
)(EditChannel));
