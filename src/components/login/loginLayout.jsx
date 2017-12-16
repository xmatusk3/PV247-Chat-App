import * as React from 'react';
import * as routes from '../../constants/routes';
import LoginForm from './loginForm';
import Loader from './loader.jsx';
import { FormBox } from './loginForm.styles';
// import { LoginHeader } from './LoginForm.styles';
import { CenterDiv } from './loginForm.styles';

const LoginLayout = ({ from }) => {
    const originalLocation = from || { pathname: routes.ROOT };
    return [
        <div className="container" key="form">
            <div className="row">
                <FormBox>
                    <Loader stateLoadingSelector={state => state.auth.isAuthenticating}>
                        <CenterDiv>
                            <img style={{height:'256px', width:'256px'}} src={require('../../../static/assets/motivacneMyChat.jpg')} />
                        </CenterDiv>
                        <div>
                            <LoginForm from={originalLocation} />
                        </div>
                    </Loader>
                </FormBox>
            </div>
        </div>,
    ];
};

export default LoginLayout;