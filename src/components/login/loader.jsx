import * as React from 'react';
import * as PropTypes from 'prop-types';
import AdvancedLoader from 'react-loader-advanced';
import { SavingSpinner } from './savingSpinner.jsx';
import { connect } from 'react-redux';

const LoadingMessage = ({ message }) => (
    <div>
        <div>
            <SavingSpinner />
        </div>
        { message || 'Loading…' }
    </div>
);

LoadingMessage.propTypes = {
    message: PropTypes.string,
};

const Loader = ({ children, isLoading, message }) => (
    <AdvancedLoader
        show={isLoading}
        message={<LoadingMessage message={message} />}
        backgroundStyle={{ borderRadius: '6px' }}
        hideContentOnLoad
    >
        {children}
    </AdvancedLoader>
);

Loader.propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool.isRequired,
    stateLoadingSelector: PropTypes.func.isRequired,
    message: PropTypes.string,
};


export default connect((state, ownProps) => ({isLoading: ownProps.stateLoadingSelector(state)}), null) (Loader);
