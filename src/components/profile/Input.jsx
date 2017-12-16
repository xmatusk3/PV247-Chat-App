import * as React from 'react';
import * as PropTypes from 'prop-types';
import { uuid } from '../../utils/uuidGenerator';
import { FormGroup, InputGroupDiv, StyledLabel, StyledValidationMessage, Input as StyledInput } from './__styles__/Input.styles';

class Input extends React.Component {
    static propTypes = {
        screenReaderName: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        readOnly: PropTypes.bool,
        required: PropTypes.bool,
        input: PropTypes.shape({
            value: PropTypes.string.isRequired,
        }).isRequired,
        meta: PropTypes.shape({
            error: PropTypes.string,
            touched: PropTypes.bool.isRequired,
            invalid: PropTypes.bool.isRequired,
            valid: PropTypes.bool.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        this.setState({ componentId: uuid() });
    }

    render() {
        const inputName = `input_${this.state.componentId}`;
        const {
            invalid,
            touched,
            error: errorMessage
        } = this.props.meta;

        const isInvalid = invalid && touched;

        return (
            <FormGroup>
                <StyledLabel
                    htmlFor={inputName}
                >
                    {this.props.screenReaderName}
                </StyledLabel>
                <InputGroupDiv
                    title={isInvalid ? errorMessage : undefined}
                >
                    <div>
                    </div>
                    <StyledInput
                        {...this.props.input}
                        type={this.props.type}
                        className="form-control"
                        id={inputName}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                    />
                    <span
                        aria-hidden="true"
                        title={errorMessage}
                    >
                    </span>
                </InputGroupDiv>
                {invalid && (
                    <StyledValidationMessage>
                        {errorMessage}
                    </StyledValidationMessage>
                )}
            </FormGroup>
        );
    }
}

export { Input };