import * as React from 'react';
import * as PropTypes from 'prop-types';
import { uuid } from '../../utils/uuidGenerator';
import { StartChattingButton } from './LoginForm.styles';
import { FormGroup } from './LoginForm.styles';
import { Input } from './LoginForm.styles';
import { InputDiv } from './LoginForm.styles';
import { ButtonWrap } from './LoginForm.styles';
import { InputGroupAddon } from './LoginForm.styles';
import { MailIcon } from './LoginForm.styles';

class LoginForm extends React.PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.setState(() => ({ componentId: uuid() }));
    }

    //<span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
    render() {
        const { componentId } = this.state;
        const loginId = `${componentId}_login`;

        return (
            <form>
                <FormGroup>
                    <InputDiv>
                        <InputGroupAddon>
                            <MailIcon />
                        </InputGroupAddon>
                        <Input placeholder="email@mail.com"
                               type="email"
                               id={loginId} />
                    </InputDiv>
                </FormGroup>
                <ButtonWrap>
                    <StartChattingButton onClick={this.props.onSubmit}>
                        Start chatting
                    </StartChattingButton>
                </ButtonWrap>
            </form>
        );
    }
}

//StartChattingButton  className="btn btn-success btn-lg"

export { LoginForm };