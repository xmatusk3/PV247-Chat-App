import * as React from 'react';
import * as PropTypes from 'prop-types';
import AdvancedLoader from 'react-loader-advanced';
import { SavingSpinner } from './SavingSpinner.jsx';

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
    message: PropTypes.string,
};

export { Loader };