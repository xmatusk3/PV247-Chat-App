import * as React from 'react';
import * as PropTypes from 'prop-types';
// import classNames from 'classnames';
import { uuid } from '../../utils/uuidGenerator';
import { FormGroup } from './Input.styles';

class Input extends React.Component {
    static propTypes = {
        screenReaderName: PropTypes.string.isRequired,
        // glyphiconClassName: PropTypes.string.isRequired,
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
            //valid,
            invalid,
            touched,
            error: errorMessage
        } = this.props.meta;

        //const isValid = valid && touched;
        const isInvalid = invalid && touched;

        // const groupClasses = classNames({
        //     'form-group': true,
        //     'has-success has-feedback': isValid,
        //     'has-error has-feedback': isInvalid,
        // });
        // const feedbackClasses = classNames({
        //     'glyphicon form-control-feedback': true,
        //     'glyphicon-star text-danger': !isValid && !isInvalid && this.props.required,
        //     'glyphicon-ok': isValid,
        //     'glyphicon-remove': isInvalid,
        // });

        return (
            <FormGroup /*className={groupClasses}*/>
                <label
                    className="sr-only"
                    htmlFor={inputName}
                >
                    {this.props.screenReaderName}
                </label>
                <div
                    className="input-group"
                    title={isInvalid ? errorMessage : undefined}
                >
                    <div className="input-group-addon">
                        {/*<span className={`glyphicon ${this.props.glyphiconClassName}`} aria-hidden="true"></span>*/}
                    </div>
                    <input
                        {...this.props.input}
                        type={this.props.type}
                        className="form-control"
                        id={inputName}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                    />
                    <span
                        /*className={feedbackClasses}*/
                        aria-hidden="true"
                        title={errorMessage}
                    >
                    </span>
                </div>
                {invalid && (
                    <span className="sr-only">
                        {errorMessage}
                    </span>
                )}
            </FormGroup>
        );
    }
}

export { Input };