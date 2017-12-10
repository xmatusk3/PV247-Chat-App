export const validateNonEmptyness = (fieldName) =>
    (value) =>
        value && value.length
            ? undefined
            : `Provide us with a ${fieldName}`;