//import { DemoComponent } from './containers-redux/demo/demoComponent.jsx';
import './utils/global-styles.js';
import { LoginLayout } from './components/login/LoginLayout.jsx';

require.context('../static/', true);
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHistory } from './utils/createHistory';
import { createStore } from './utils/createStore';

const history = createHistory();
const store = createStore(history);

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <LoginLayout />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));