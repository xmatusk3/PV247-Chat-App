import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Alert } from './UpdatePane.styles';
import * as formStates from '../../constants/actionTypes';
import { SavingSpinner } from '../shared/SavingSpinner.jsx';

const NoChangedDetails = () => (
    <Alert
        className="well-sm alert-info text-center"
        role="alert"
    >
        Details outdated? Make a change…
    </Alert>
);

const InvalidDetails = () => (
    <Alert
        className="well-sm alert-warning text-center"
        role="alert"
    >
        Fix red fields to allow update…
    </Alert>
);

const SubmitDetails = () => (
    <button
        type="submit"
        className="btn btn-primary btn-block well-sm"
    >
        Update details
    </button>
);

const UploadingDetails = () => (
    <Alert
        className="well-sm alert-warning text-center"
        role="alert"
    >
        <SavingSpinner />
        &nbsp;
        Saving…
    </Alert>
);

const UpdatePane = ({ formState }) => {
    switch (formState) {
        case formStates.NOT_CHANGED:
            return <NoChangedDetails />;

        case formStates.INVALID:
            return <InvalidDetails />;

        case formStates.SAVEAVBLE:
            return <SubmitDetails />;

        case formStates.SAVING_NOW:
            return <UploadingDetails />;

        default:
            throw new Error(`Unknown form state "${formState}"`);
    }
};

UpdatePane.propTypes = {
    formState: PropTypes.string.isRequired,
};

export { UpdatePane };