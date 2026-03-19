import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <span className="error-msg" aria-live="polite">
            {message}
        </span>
    );
};

export default ErrorMessage;