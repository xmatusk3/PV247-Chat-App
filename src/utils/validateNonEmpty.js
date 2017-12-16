export const validateNonEmptyness = (fieldName) =>
    (value) =>
        value && value.length && value.trim().length
            ? undefined
            : `Provide us with a ${fieldName}`;