import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Alert, AlertWarning } from './__styles__/UpdatePane.styles';
import * as formStates from '../../constants/actionTypes';
import { SavingSpinner } from '../shared/SavingSpinner.jsx';
import { UpdateButton } from './__styles__/Input.styles';

const NoChangedDetails = () => (
    <Alert
        role="alert"
    >
        Details outdated? Make a change…
    </Alert>
);

const InvalidDetails = () => (
    <AlertWarning
        role="alert"
    >
        Type valid nickname to allow update…
    </AlertWarning>
);

const SubmitDetails = () => (
    <UpdateButton
        type="submit"
    >
        Update details
    </UpdateButton>
);

const UploadingDetails = () => (
    <AlertWarning
        role="alert"
    >
        <SavingSpinner />
        &nbsp;
        Saving…
    </AlertWarning>
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