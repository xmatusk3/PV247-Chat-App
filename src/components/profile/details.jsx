import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
    uploadUserDetails
} from '../../actions/profile/actionCreators';

import { Input } from './input.jsx';
import { UpdatePane } from './updatePane.jsx';
import { validateNonEmptyness } from '../../utils/validateNonEmpty';
import * as formStates from '../../constants/actionTypes';

const validateNickname = validateNonEmptyness('Nickname');

const getFormState = (dirty, valid, submitting ) => {
    if(!dirty) {
        return formStates.NOT_CHANGED;
    }

    if(!valid) {
        return formStates.INVALID;
    }

    if(submitting) {
        return formStates.SAVING_NOW;
    }

    return formStates.SAVEAVBLE;
};

const Details = ({ handleSubmit, onSubmit, valid, dirty, submitting, user }) => (
    <div className="panel panel-default">
        <div className="panel-body">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    type="email"
                    placeholder={user.email}
                    screenReaderName="E-mail"
                    readOnly
                    required
                    name="email"
                    component={Input}
                />
                <Field
                    type="text"
                    placeholder={user.nickname}
                    screenReaderName='Nickname'
                    name="nickname"
                    required
                    component={Input}
                    validate={validateNickname}
                />

                <UpdatePane formState={getFormState(dirty, valid, submitting)}/>
            </form>
        </div>
    </div>
);

Details.propTypes = {
    valid: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    touchOnChange: true,
    form: 'DetailsForm'
})(
    connect(
        (state) => ({
            user: state.users.user,
        }),
        (dispatch) => ({
            onSubmit: (details) => {
                dispatch(uploadUserDetails(details));
            }
        }))(Details)
);