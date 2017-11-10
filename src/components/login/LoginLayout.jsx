import * as React from 'react';
import * as routes from '../../constants/routes';
import { LoginForm } from '../../containers-redux/login/LoginForm.jsx';
import { Loader } from '../../containers-redux/shared/Loader.jsx';
import { FormBox } from './LoginForm.styles';
import { LoginHeader } from './LoginForm.styles';
import { CenterDiv } from './LoginForm.styles';
//import { FrontPageImage } from './LoginForm.styles';

const LoginLayout = ({ from }) => {
    const originalLocation = from || { pathname: routes.ROOT };
//<Loader stateLoadingSelector={state => state.shared.isAuthenticating}>

    // <LoginHeader>PV247</LoginHeader>
    //namiesto FormBox <div className="jumbotron col-xs-10 col-xs-push-1 col-md-6 col-md-push-3 col-lg-4 col-lg-push-4 text-center">
    return [
        <div className="container" key="form">
            <div className="row">
                <FormBox>
                    <Loader stateLoadingSelector={state => state.isAuthenticating}>
                        <CenterDiv>
                            <img src={require('../../../static/assets/chat_logo_only_smallest.png')} />
                        </CenterDiv>
                        <div style={{clear: 'both'}}>
                            <LoginHeader>myChat</LoginHeader>
                        </div>
                        <div>
                            <LoginForm from={originalLocation} />
                        </div>
                    </Loader>
                </FormBox>
            </div>
        </div>,
    ];
};

export { LoginLayout };