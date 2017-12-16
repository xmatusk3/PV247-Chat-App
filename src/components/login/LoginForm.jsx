import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authenticateUser } from '../../actions/authentication/actionCreators';
import validateEmail from '../../utils/validateEmail';

import { StartChattingButton, FormGroup, Input, InputDiv, ButtonWrap, InputGroupAddon, MailIcon } from './LoginForm.styles';

class LoginForm extends React.Component {
    static propTypes = {
        authError: PropTypes.string.isRequired,
        authenticateUser: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        from: PropTypes.object.isRequired
    };

    onSubmit({ email }) {
        this.props.authenticateUser(email);
    }

    renderEmail(field) {
        const {meta: { touched, error} } = field;
        return (
            <FormGroup>
                <InputDiv>
                    <InputGroupAddon>
                        <MailIcon />
                    </InputGroupAddon>
                    <Input
                        placeholder="email@mail.com"
                        type="text"
                        {...field.input}
                    />
                    <div>
                        {touched ? error : ''}
                    </div>
                </InputDiv>
            </FormGroup>
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {this.props.authError}
                <Field
                    name="email"
                    component={this.renderEmail}
                />
                <ButtonWrap>
                    <StartChattingButton type="submit">
                        Start chatting
                    </StartChattingButton>
                </ButtonWrap>
            </form>
        );
    }
}

const validate = ({ email }) => {
    const errors = {};

    if(!email) {
        errors.email = 'Enter an email!';
    }

    if( !validateEmail(email)) {
        errors.email = 'Please enter an email with pattern: something@something.something';
    }

    return errors;
};

export default reduxForm({
    validate,
    form: 'EmailLogin'
})(
    connect((state) => ({ authError: state.auth.authResult.error }), {authenticateUser})(LoginForm)
);