import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { sendChatMessage } from '../../actions/messages/actionCreators';

class TextEditor extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        sendChatMessage: PropTypes.func.isRequired
    };

    onSubmit = ({chatText}) => {
        this.props.sendChatMessage(chatText);
    };

    renderField = (field) =>  (
        <textarea
            {...field.input}
            placeholder={field.placeholder}
        />
    );

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)} style={{display: 'flex', alignItems: 'flex-start'}}>
                    <Field
                        name="chatText"
                        placeholder="Type a message..."
                        component={this.renderField}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'TextEditorForm'
})(connect(
    null,
    { sendChatMessage }
)(TextEditor));