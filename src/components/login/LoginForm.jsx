import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authenticateUser } from '../../actions/shared/actionCreators';

import { StartChattingButton, FormGroup, Input, InputDiv, ButtonWrap, InputGroupAddon, MailIcon } from './LoginForm.styles';

class LoginForm extends React.Component {
    static propTypes = {
        authenticateUser: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        from: PropTypes.object.isRequired
    };

    onSubmit(values) {
        this.props.authenticateUser(values);
    }

    renderEmail(field) {
        const {meta: { touched, error} } = field;
        // eslint-disable-next-line
        console.log(field);
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

const validate = (values) => {
    const errors = {};

    //eslint-disable-next-line
    console.log('I am inside validation ', values.email);

    if(!values.email) {
        //eslint-disable-next-line
        console.log('Email is: ', values.email);
        errors.email = 'Enter an email!';
    }

    if( !(/.+@.+\.com/.test(values.email))) {
        errors.email = 'Please enter an email with pattern: something@something.something';
    }

    return errors;
};

export default reduxForm({
    validate,
    form: 'EmailLogin'
})(
    connect(null, {authenticateUser})(LoginForm)
);