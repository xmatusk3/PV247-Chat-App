import * as React from 'react';
import * as routes from '../../constants/routes';
import LoginForm from './LoginForm';
import { Loader } from '../../containers/shared/Loader.jsx';
import { FormBox } from './LoginForm.styles';
// import { LoginHeader } from './LoginForm.styles';
import { CenterDiv } from './LoginForm.styles';

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
                        {/*<div style={{clear: 'both'}}>*/}
                            {/*<LoginHeader>myChat</LoginHeader>*/}
                        {/*</div>*/}
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